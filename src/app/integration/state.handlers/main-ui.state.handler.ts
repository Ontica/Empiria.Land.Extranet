/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, CommandResult, Exception, resolve } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { NavigationHeader, DefaultNavigationHeader,
         buildNavigationHeader,
         Layout, View, DefaultView } from '@app/user-interface/main-layout/common-models';

import { APP_LAYOUTS, APP_VIEWS } from '@app/user-interface/main-layout/config-data';

export enum ActionType {
  SET_CURRENT_VIEW_FROM_URL = 'Empiria.UI-Item.MainUserInterface.SetCurrentViewFromUrl'
}


export enum SelectorType {
  LAYOUT            = 'Empiria.UI-Item.MainUserInterface.Layout',
  NAVIGATION_HEADER = 'Empiria.UI-Item.MainUserInterface.NavigationHeader',
  CURRENT_VIEW      = 'Empiria.UI-Item.MainUserInterface.CurrentView'
}

enum CommandEffectType {

}

export interface MainUserInterfaceState {
  readonly layout: Layout;
  readonly navigationHeader: NavigationHeader;
  readonly currentView: View;
}


const initialState: StateValues = [
  { key: SelectorType.LAYOUT, value: APP_LAYOUTS[0] },
  { key: SelectorType.NAVIGATION_HEADER, value: DefaultNavigationHeader },
  { key: SelectorType.CURRENT_VIEW, value: DefaultView }
];

@Injectable()
export class MainUserInterfaceStateHandler extends AbstractStateHandler<MainUserInterfaceState> {

  constructor() {
    super(initialState, SelectorType, ActionType, CommandEffectType);
  }


  get state(): MainUserInterfaceState {
    return {
      layout: this.getValue(SelectorType.LAYOUT),
      navigationHeader: this.getValue(SelectorType.NAVIGATION_HEADER),
      currentView: this.getValue(SelectorType.CURRENT_VIEW)
    };
  }


  applyEffects(command: CommandResult): void {
    switch ((command.type as any) as CommandEffectType) {

      default:
        throw this.unhandledCommandOrActionType(command);
    }
  }


  dispatch<U>(actionType: ActionType, payload?: any): Promise<U> {
    switch (actionType) {

      case ActionType.SET_CURRENT_VIEW_FROM_URL:
        Assertion.assertValue(payload.url, 'payload.url');

        this.setCurrentViewFromUrl(payload.url);

        return resolve<U>();

      default:
        throw this.unhandledCommandOrActionType(actionType);
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


  private setCurrentViewFromUrl(url: string) {
    if (this.state.currentView.url !== url) {
      const view = APP_VIEWS.find(x => x.url === url);

      if (!view) {
        const msg = `Unregistered view with url '${url}'.`;
        console.log(msg);
        throw new Exception(msg);
      }

      const viewLayout = this.getViewLayout(view);

      if (this.state.layout !== viewLayout) {
        this.setLayout(viewLayout);
      }

      this.setNavigationHeader(view);

      this.setValue(SelectorType.CURRENT_VIEW, view);
    }
  }


  private setLayout(value: Layout) {
    if (this.state.layout !== value) {
      this.setValue(SelectorType.LAYOUT, value);
    }
  }



  private setNavigationHeader(value: NavigationHeader | View) {
    if (value && 'url' in value) {
      const layout = APP_LAYOUTS.find(x => x.name === this.state.layout.name);

      const navHeader = buildNavigationHeader(layout, value.title);

      this.setValue(SelectorType.NAVIGATION_HEADER, navHeader);

    } else if (value) {
      this.setValue(SelectorType.NAVIGATION_HEADER, value as NavigationHeader);
    }
  }

}
