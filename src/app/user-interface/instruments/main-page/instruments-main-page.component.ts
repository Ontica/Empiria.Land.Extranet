/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Assertion, EventInfo, isEmpty } from '@app/core';

import { PresentationState } from '@app/core/presentation';
import { RequestsStateSelector, RequestsStateAction,
         MainUIStateSelector } from '@app/core/presentation/state.commands';

import { Request, EmptyRequest, RequestStatus,
         RequestFilter, EmptyRequestFilter } from '@app/domain/models';

import { View } from '@app/user-interface/main-layout';

import { RequestListEventType } from '../list/instrument-list.component';


@Component({
  selector: 'emp-one-electronic-filing-main-page',
  templateUrl: './instruments-main-page.component.html'
})
export class ElectronicFilingMainPageComponent implements OnInit, OnDestroy {

  displayEditor = false;
  currentView: View;

  requestList: Request[] = [];
  selectedRequest: Request = EmptyRequest;
  filter: RequestFilter = EmptyRequestFilter;

  displayRequestCreator = false;

  isLoading = false;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private store: PresentationState) { }


  ngOnInit() {
    this.store.select<Request[]>(RequestsStateSelector.REQUESTS_LIST)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.requestList = x;
        this.isLoading = false;
      });

    this.store.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x =>
        this.onChangeView(x)
      );

    this.store.select<Request>(RequestsStateSelector.SELECTED_REQUEST)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.selectedRequest = x;
        this.displayEditor = !isEmpty(this.selectedRequest);
      });

    this.store.select<RequestFilter>(RequestsStateSelector.LIST_FILTER)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x =>
        this.filter = x
      );
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  onCloseEditor() {
    this.store.dispatch(RequestsStateAction.UNSELECT_REQUEST);
  }


  onRequestCreatorClosed() {
    this.displayRequestCreator = false;
  }


  onRequestListEvent(event: EventInfo): void {
    switch (event.type as RequestListEventType) {

      case RequestListEventType.SET_FILTER:
        this.loadRequests(event.payload);
        return;

      case RequestListEventType.ON_CLICK_CREATE_REQUEST_BUTTON:
        this.displayRequestCreator = true;
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  // private methods


  private onChangeView(newView: View) {
    this.currentView = newView;
    this.loadRequests();
  }


  private getRequestStatusForView(view: View): RequestStatus {
    switch (view.name) {
      case 'Requests.Pending':
        return 'Pending';
      case 'Requests.Signed':
        return 'Signed';
      case 'Requests.OnPayment':
        return 'OnPayment';
      case 'Requests.Signed':
        return 'Signed';
      case 'Requests.Submitted':
        return 'Submitted';
      case 'Requests.Finished':
        return 'Finished';
      case 'Requests.Rejected':
        return 'Rejected';
      case 'Requests.All':
        return 'All';
      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized view with name '${view.name}'.`);
    }
  }


  private loadRequests(data?: { keywords: string }) {
    const currentKeywords = this.store.getValue<RequestFilter>(RequestsStateSelector.LIST_FILTER).keywords;

    const filter = {
      status: this.getRequestStatusForView(this.currentView),
      keywords: data ? data.keywords : currentKeywords
    };

    this.isLoading = true;
    this.store.dispatch(RequestsStateAction.LOAD_REQUESTS_LIST, { filter });
  }

}
