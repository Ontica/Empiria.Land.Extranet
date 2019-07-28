/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Assertion, Exception } from '@app/core';

import { DefaultNavigationHeader, DefaultView, Layout,
         NavigationHeader, View, buildNavigationHeader } from '@app/shared/common-models';


import { APP_LAYOUTS, APP_VIEWS,
         VALUE_SELECTOR, getValueSelectorDefaultValue } from '@app/user-interface/config-data';


@Injectable()
export class UserInterfaceStore {

  private currentLayoutSubject: BehaviorSubject<Layout> = new BehaviorSubject<Layout>(APP_LAYOUTS[0]);

  private currentViewSubject: BehaviorSubject<View> = new BehaviorSubject<View>(DefaultView);

  private navigationHeaderSubject:
                BehaviorSubject<NavigationHeader> = new BehaviorSubject(DefaultNavigationHeader);

  private valuesMap = new Map<string, BehaviorSubject<any>>();


  constructor() { }


  // select methods

  get currentView(): Observable<View> {
    return this.currentViewSubject.asObservable();
  }


  get layout(): Observable<Layout> {
    return this.currentLayoutSubject.asObservable();
  }


  get navigationHeader(): Observable<NavigationHeader> {
    return this.navigationHeaderSubject.asObservable();
  }


  getValue<T>(selector: VALUE_SELECTOR, defaultValue?: T): Observable<T> {
    if (this.valuesMap.has(selector)) {
      const subject = this.valuesMap.get(selector) as BehaviorSubject<T>;

      return subject.asObservable();

    } else {
      defaultValue = defaultValue || getValueSelectorDefaultValue(selector) as T;
      const subject = new BehaviorSubject<T>(defaultValue);

      this.valuesMap.set(selector, subject);

      return subject.asObservable();
    }
  }


  // reduce methods

  setCurrentViewFromUrl(url: string) {
    if (this.currentViewSubject.value.url !== url) {
      const view = APP_VIEWS.find(x => x.url === url);

      if (!view) {
        const msg = `Unregistered view with url '${url}'.`;
        console.log(msg);
        throw new Exception(msg);
      }

      const viewLayout = this.getViewLayout(view);

      if (this.currentLayoutSubject.value !== viewLayout) {
        this.setLayout(viewLayout);
      }

      this.setNavigationHeader(view);

      this.currentViewSubject.next(view);
    }
  }


  setMainTitle(newTitle: string) {
    const newHeader = Object.assign({}, this.navigationHeaderSubject.value, { title: newTitle });

    this.setNavigationHeader(newHeader);
  }


  setNavigationHeader(value: NavigationHeader | View) {
    if (value && 'url' in value) {
      const layout = APP_LAYOUTS.find(x => x.name === this.currentLayoutSubject.value.name);

      const navHeader = buildNavigationHeader(layout, value.title);

      this.navigationHeaderSubject.next(navHeader);

    } else if (value) {
      this.navigationHeaderSubject.next(value as NavigationHeader);
    }
  }


  setValue<T>(selector: VALUE_SELECTOR, value: T) {
    if (!this.valuesMap.has(selector)) {
      this.valuesMap.set(selector, new BehaviorSubject<T>(value));
    } else {
      const subject = this.valuesMap.get(selector) as BehaviorSubject<T>;

      subject.next(value);
    }
  }

  // private methods


  private getViewLayout(view: View): Layout {
    for (const layout of APP_LAYOUTS) {
      if (layout.views.includes(view)) {
        return layout;
      }
    }
    throw Assertion.assertNoReachThisCode(`Unregistered view ${view.name}.`);
  }


  private setLayout(value: Layout) {
    if (this.currentLayoutSubject.value !== value) {
      this.currentLayoutSubject.next(value);
    }
  }

}
