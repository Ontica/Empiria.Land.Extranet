/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { PresentationState } from '@app/core/presentation';
import { MainUIStateAction, StateAction } from '@app/core/presentation/state.commands';


@Component({
  selector: 'emp-ng-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  keywords = '';

  constructor(store: PresentationState, private router: Router) {

    this.router.events.subscribe(val => {
      if (val instanceof ActivationEnd) {
        const url = this.router.routerState.snapshot.url.split(';')[0];

        store.dispatch(MainUIStateAction.SET_CURRENT_VIEW_FROM_URL, { url });
      }
    });

  }


  onAction(action: StateAction) {

  }


  search(keywords: string) {
    if (keywords) {
      this.router.navigate(['/search-services/all', { keywords } ]);
    }
  }

}
