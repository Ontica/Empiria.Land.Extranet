/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, CommandResult, Exception } from '@app/core';

import { AbstractStateHandler, StateValues, SelectorConfig } from '@app/core/presentation/state-handler';

import { NavigationHeader, DefaultNavigationHeader,
         buildNavigationHeader,
         Layout, View, DefaultView } from '@app/user-interface/main-layout/common-models';

import { APP_LAYOUTS, APP_VIEWS } from '@app/user-interface/main-layout/config-data';


export enum ActionType {
  SET_CURRENT_VIEW_FROM_URL = 'Empiria.UI-Item.MainUserInterface.SetCurrentViewFromUrl',
  SET_IS_PROCESSING_FLAG    = 'Empiria.UI-Item.MainUserInterface.SetIsProcessingFlag'
}


export enum SelectorType {
  LAYOUT            = 'Empiria.UI-Item.MainUserInterface.Layout',
  NAVIGATION_HEADER = 'Empiria.UI-Item.MainUserInterface.NavigationHeader',
  CURRENT_VIEW      = 'Empiria.UI-Item.MainUserInterface.CurrentView',
  IS_PROCESSING     = 'Empiria.UI-Item.MainUserInterface.IsProcessing'
}

export interface MainUserInterfaceState {
  readonly layout: Layout;
  readonly navigationHeader: NavigationHeader;
  readonly currentView: View;
  readonly isProcessing: boolean;
}


@Injectable()
export class MainUserInterfaceStateHandler extends AbstractStateHandler {

  constructor() {
    super({ selectors: SelectorType, actions: ActionType });
  }


  get state(): MainUserInterfaceState {
    return {
      layout: this.getValue(SelectorType.LAYOUT),
      navigationHeader: this.getValue(SelectorType.NAVIGATION_HEADER),
      currentView: this.getValue(SelectorType.CURRENT_VIEW),
      isProcessing: this.getValue(SelectorType.IS_PROCESSING)
    };
  }


  applyEffects(command: CommandResult): void {
    throw this.unhandledCommandOrActionType(command);
  }


  dispatch<U>(actionType: ActionType, payload?: any): Promise<U> | void {
    switch (actionType) {

      case ActionType.SET_IS_PROCESSING_FLAG:
        Assertion.assert(typeof payload === 'boolean', `${actionType} payload must be a boolean value.`);

        this.setValue(SelectorType.IS_PROCESSING, payload);
        return;

      case ActionType.SET_CURRENT_VIEW_FROM_URL:
        Assertion.assertValue(payload.url, 'payload.url');

        this.setCurrentViewFromUrl(payload.url);
        return;

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }


  protected getSelectorConfig(selector: SelectorType): SelectorConfig {
    switch (selector) {
      case SelectorType.LAYOUT:
        return { initialState: APP_LAYOUTS[0] };

      case SelectorType.NAVIGATION_HEADER:
        return { initialState: DefaultNavigationHeader };

      case SelectorType.CURRENT_VIEW:
        return { initialState: DefaultView };

      case SelectorType.IS_PROCESSING:
        return { initialState: false };

      default:
        throw this.unhandledCommandOrActionType(selector);
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
        throw new Exception(`Unregistered view with url '${url}'.`);
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
