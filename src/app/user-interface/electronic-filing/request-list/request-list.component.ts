/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { EventInfo } from '@app/core';

import { PresentationState } from '@app/core/presentation';

import { Request, EmptyRequest,
         RequestFilter, EmptyRequestFilter } from '@app/domain/models';

import { ElectronicFilingAction } from '@app/core/presentation/state.commands';


export enum RequestListEventType {
  SET_FILTER                     = 'RequestListComponent.SetFilter',
  ON_CLICK_CREATE_REQUEST_BUTTON = 'RequestListComponent.OnClickCreateRequestButton'
}


@Component({
  selector: 'emp-one-request-list',
  templateUrl: './request-list.component.html'
})
export class RequestListComponent implements OnChanges {

  @Input() requestList: Request[] = [];

  @Input() selectedRequest: Request = EmptyRequest;

  @Input() filter: RequestFilter = EmptyRequestFilter;

  @Input() title: 'Solicitudes';

  @Input() isLoading = false;

  @Output() requestListEvent = new EventEmitter<EventInfo>();

  keywords = '';


  constructor(private store: PresentationState) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.keywords = this.filter.keywords;
    }
  }


  isSelected(request: Request) {
    return (this.selectedRequest.uid === request.uid);
  }


  onFilterChange() {
    this.setFilter();
  }


  onSelect(request: Request) {
    this.store.dispatch(ElectronicFilingAction.SELECT_REQUEST, { request });
  }


  onClickCreateRequestButton() {
    const event: EventInfo = {
      type: RequestListEventType.ON_CLICK_CREATE_REQUEST_BUTTON
    };

    this.requestListEvent.emit(event);
  }


  // private methods


  private setFilter() {
    const event: EventInfo = {
      type: RequestListEventType.SET_FILTER,
      payload: { keywords: this.keywords }
    };

    this.requestListEvent.emit(event);
  }

}
