/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, CommandResult } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { InstrumentUseCases } from '@app/domain/use-cases';

import { LegalInstrument, LegalInstrumentFilter,
         EmptyLegalInstrumentFilter, EmptyLegalInstrument } from '@app/domain/models';
import { InstrumentCommandType } from '../command.handlers/commands';
import { switchMap, take } from 'rxjs/operators';


export enum ActionType {
  LOAD_INSTRUMENT_LIST = 'Land.UI-Action.LegalInstruments.LoadInstrumentList',
  SELECT_INSTRUMENT     = 'Land.UI-Action.LegalInstruments.SelectInstrument',
  UNSELECT_INSTRUMENT   = 'Land.UI-Action.LegaInstruments.UnselectInstrument'
}


export enum SelectorType {
  INSTRUMENT_LIST     = 'Land.UI-Item.LegalInstruments.List',
  LIST_FILTER         = 'Land.UI-Item.LegalInstruments.Filter',
  SELECTED_INSTRUMENT = 'Land.UI-Item.LegalInstruments.SelectedInstrument'
}


enum CommandEffectType {
  CREATE_PREVENTIVE_NOTE     = InstrumentCommandType.CREATE_PREVENTIVE_NOTE,
  UPDATE_PREVENTIVE_NOTE     = InstrumentCommandType.UPDATE_PREVENTIVE_NOTE,
  SIGN                       = InstrumentCommandType.SIGN,
  REVOKE_SIGN                = InstrumentCommandType.REVOKE_SIGN,
  REQUEST_PAYMENT_ORDER      = InstrumentCommandType.REQUEST_PAYMENT_ORDER,
  FILE_TO_REGISTRY_AUTHORITY = InstrumentCommandType.FILE_TO_REGISTRY_AUTHORITY
}


export interface InstrumentsState {
  readonly instrumentsList: LegalInstrument[];
  readonly listFilter: LegalInstrumentFilter;
  readonly selectedInstrument: LegalInstrument;
}


const initialState: StateValues = [
  { key: SelectorType.INSTRUMENT_LIST, value: [] },
  { key: SelectorType.LIST_FILTER, value: EmptyLegalInstrumentFilter },
  { key: SelectorType.SELECTED_INSTRUMENT, value: EmptyLegalInstrument }
];

@Injectable()
export class InstrumentsStateHandler extends AbstractStateHandler<InstrumentsState> {

  constructor(private useCases: InstrumentUseCases) {
    super(initialState, SelectorType, ActionType, CommandEffectType);
  }


  get state(): InstrumentsState {
    return {
      instrumentsList: this.getValue(SelectorType.INSTRUMENT_LIST),
      listFilter: this.getValue(SelectorType.LIST_FILTER),
      selectedInstrument: this.getValue(SelectorType.SELECTED_INSTRUMENT)
    };
  }


  applyEffects(command: CommandResult): void {
    switch ((command.type as any) as CommandEffectType) {

      case CommandEffectType.CREATE_PREVENTIVE_NOTE:
        this.stateUpdater.appendToStart(SelectorType.INSTRUMENT_LIST, command.result);
        this.setValue(SelectorType.SELECTED_INSTRUMENT, command.result);
        return;

      case CommandEffectType.UPDATE_PREVENTIVE_NOTE:
      case CommandEffectType.SIGN:
      case CommandEffectType.REVOKE_SIGN:
      case CommandEffectType.REQUEST_PAYMENT_ORDER:
      case CommandEffectType.FILE_TO_REGISTRY_AUTHORITY:
        this.stateUpdater.replaceEntity(SelectorType.INSTRUMENT_LIST, command.result);
        this.setValue(SelectorType.SELECTED_INSTRUMENT, command.result);
        return;

      default:
        throw this.unhandledCommandOrActionType(command);
    }
  }


  dispatch<U>(actionType: ActionType, payload?: any): Promise<U> | void {
    switch (actionType) {

      case ActionType.LOAD_INSTRUMENT_LIST:
        Assertion.assertValue(payload.filter, 'payload.filter');

        this.setValue(SelectorType.LIST_FILTER, payload.filter);

        return this.setValue<U>(SelectorType.INSTRUMENT_LIST,
                                this.useCases.getInstruments(this.state.listFilter));

      case ActionType.SELECT_INSTRUMENT:
        Assertion.assertValue(payload.instrument, 'payload.instrument');

        this.setValue(SelectorType.SELECTED_INSTRUMENT, payload.instrument);
        return;


      case ActionType.UNSELECT_INSTRUMENT:
        this.setValue(SelectorType.SELECTED_INSTRUMENT, EmptyLegalInstrument);
        return;

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }

}
