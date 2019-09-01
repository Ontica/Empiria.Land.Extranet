/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, CommandResult } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { ElectronicFilingUseCases } from '@app/domain/use-cases';

import { EFilingRequest, EFilingRequestFilter,
         EmptyEFilingRequestFilter, EmptyEFilingRequest } from '@app/domain/models';
import { ElectronicFilingCommandType } from '../command.handlers/commands';


export enum ActionType {
  LOAD_REQUESTS_LIST = 'OnePoint.UI-Action.ElectronicFiling.LoadRequestList',
  SELECT_REQUEST     = 'OnePoint.UI-Action.ElectronicFiling.SelectRequest',
  UNSELECT_REQUEST   = 'OnePoint.UI-Action.ElectronicFiling.UnselectRequest'
}


export enum SelectorType {
  REQUESTS_LIST    = 'OnePoint.UI-Item.ElectronicFiling.List',
  LIST_FILTER      = 'OnePoint.UI-Item.ElectronicFiling.Filter',
  SELECTED_REQUEST = 'OnePoint.UI-Item.ElectronicFiling.SelectedRequest'
}


enum CommandEffectType {
  CREATE_EFILING_REQUEST  = ElectronicFilingCommandType.CREATE_EFILING_REQUEST,
  UPDATE_EFILING_REQUEST  = ElectronicFilingCommandType.UPDATE_EFILING_REQUEST,
  UPDATE_APPLICATION_FORM = ElectronicFilingCommandType.UPDATE_APPLICATION_FORM,
  SIGN                    = ElectronicFilingCommandType.SIGN,
  REVOKE_SIGN             = ElectronicFilingCommandType.REVOKE_SIGN,
  GENERATE_PAYMENT_ORDER  = ElectronicFilingCommandType.GENERATE_PAYMENT_ORDER,
  REQUEST_SUBMISSION      = ElectronicFilingCommandType.REQUEST_SUBMISSION
}


export interface ElectronicFilingState {
  readonly requestsList: EFilingRequest[];
  readonly listFilter: EFilingRequestFilter;
  readonly selectedRequest: EFilingRequest;
}


const initialState: StateValues = [
  { key: SelectorType.REQUESTS_LIST, value: [] },
  { key: SelectorType.LIST_FILTER, value: EmptyEFilingRequestFilter },
  { key: SelectorType.SELECTED_REQUEST, value: EmptyEFilingRequest }
];


@Injectable()
export class ElectronicFilingStateHandler extends AbstractStateHandler<ElectronicFilingState> {

  constructor(private useCases: ElectronicFilingUseCases) {
    super(initialState, SelectorType, ActionType, CommandEffectType);
  }


  get state(): ElectronicFilingState {
    return {
      requestsList: this.getValue(SelectorType.REQUESTS_LIST),
      listFilter: this.getValue(SelectorType.LIST_FILTER),
      selectedRequest: this.getValue(SelectorType.SELECTED_REQUEST)
    };
  }


  applyEffects(command: CommandResult): void {
    switch ((command.type as any) as CommandEffectType) {

      case CommandEffectType.CREATE_EFILING_REQUEST:
        this.stateUpdater.appendToStart(SelectorType.REQUESTS_LIST, command.result);
        this.setValue(SelectorType.SELECTED_REQUEST, command.result);
        return;

      case CommandEffectType.UPDATE_APPLICATION_FORM:
      case CommandEffectType.UPDATE_EFILING_REQUEST:
      case CommandEffectType.SIGN:
      case CommandEffectType.REVOKE_SIGN:
      case CommandEffectType.GENERATE_PAYMENT_ORDER:
      case CommandEffectType.REQUEST_SUBMISSION:
        this.stateUpdater.replaceEntity(SelectorType.REQUESTS_LIST, command.result);
        this.setValue(SelectorType.SELECTED_REQUEST, command.result);
        return;

      default:
        throw this.unhandledCommandOrActionType(command);
    }
  }


  dispatch<U>(actionType: ActionType, payload?: any): Promise<U> | void {
    switch (actionType) {

      case ActionType.LOAD_REQUESTS_LIST:
        Assertion.assertValue(payload.filter, 'payload.filter');

        this.setValue(SelectorType.LIST_FILTER, payload.filter);

        return this.setValue<U>(SelectorType.REQUESTS_LIST,
                                this.useCases.getRequests(this.state.listFilter));

      case ActionType.SELECT_REQUEST:
        Assertion.assertValue(payload.request, 'payload.request');

        this.setValue(SelectorType.SELECTED_REQUEST, payload.request);
        return;


      case ActionType.UNSELECT_REQUEST:
        this.setValue(SelectorType.SELECTED_REQUEST, EmptyEFilingRequest);
        return;

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }

}