/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, CommandResult } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { InstrumentUseCases, PropertyUseCases } from '@app/domain/use-cases';

import { LegalInstrument, LegalInstrumentFilter, EmptyLegalInstrumentFilter } from '@app/domain/models';
import { InstrumentCommandType } from '../command.handlers/commands';


export enum ActionType {
  SET_INSTRUMENT_FILTER = 'LAND.LEGAL-INSTRUMENTS-LIST.SET-FILTER',
  GET_REAL_ESTATE = 'LAND.REAL_ESTATE.LOAD_OR_GET_FROM_CACHE'
}


export enum SelectorType {
  INSTRUMENT_LIST = 'LAND.LEGAL-INSTRUMENTS-LIST',
  LIST_FILTER = 'LAND.LEGAL-INSTRUMENTS.FILTER'
}


enum CommandEffectType {
  CREATE_PREVENTIVE_NOTE = InstrumentCommandType.CREATE_PREVENTIVE_NOTE,
  UPDATE_PREVENTIVE_NOTE = InstrumentCommandType.UPDATE_PREVENTIVE_NOTE,
  SIGN_LEGAL_INSTRUMENT = InstrumentCommandType.SIGN_LEGAL_INSTRUMENT,
  REVOKE_LEGAL_INSTRUMENT_SIGN = InstrumentCommandType.REVOKE_LEGAL_INSTRUMENT_SIGN,
}


export interface InstrumentsState {
  readonly instrumentsList: LegalInstrument[];
  readonly listFilter: LegalInstrumentFilter;
}


const stateMap: StateValues = [
  { key: SelectorType.INSTRUMENT_LIST, value: [] },
  { key: SelectorType.LIST_FILTER, value: EmptyLegalInstrumentFilter }
];


@Injectable()
export class InstrumentsStateHandler extends AbstractStateHandler<InstrumentsState> {


  constructor(private useCases: InstrumentUseCases,
              private propertyUseCases: PropertyUseCases) {
    super(stateMap, SelectorType, ActionType, CommandEffectType);
  }


  get state(): InstrumentsState {
    return {
      instrumentsList: this.getValue(SelectorType.INSTRUMENT_LIST),
      listFilter: this.getValue(SelectorType.LIST_FILTER)
    };
  }


  applyEffects(command: CommandResult): void {
    switch ((command.type as any) as CommandEffectType) {

      case CommandEffectType.CREATE_PREVENTIVE_NOTE:
        // this.updateStateUtils.appendToStart(SelectorType.INSTRUMENT_LIST, command.result);
        // return;
        return this.setValue(SelectorType.INSTRUMENT_LIST,
                             [command.result].concat(this.state.instrumentsList));

      case CommandEffectType.UPDATE_PREVENTIVE_NOTE:
      case CommandEffectType.SIGN_LEGAL_INSTRUMENT:
      case CommandEffectType.REVOKE_LEGAL_INSTRUMENT_SIGN:
        // this.updateStateUtils.replaceEntity(SelectorType.INSTRUMENT_LIST, command.result);
        // return;
        const indexOf = this.state.instrumentsList.findIndex(x => x.uid === command.result.uid);
        if (indexOf >= 0) {
          const newList = this.state.instrumentsList;
          newList[indexOf] = command.result;
          this.setValue(SelectorType.INSTRUMENT_LIST, newList);
        }
        return;
      default:
        throw this.unhandledCommandOrActionType(command);
    }
  }


  dispatch<U>(actionType: ActionType, payload?: any): Promise<any> {
    switch (actionType) {

      case ActionType.GET_REAL_ESTATE:
        Assertion.assertValue(payload.uid, 'options.uid');

        return this.propertyUseCases.getRealEstate(payload.uid).toPromise();

      case ActionType.SET_INSTRUMENT_FILTER:
        Assertion.assertValue(payload.filter, 'payload.filter');

        this.setValue(SelectorType.LIST_FILTER, payload.filter);
        this.setValue(SelectorType.INSTRUMENT_LIST, this.getInstrumentsList());

        return Promise.resolve();

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }


  // private methods


  private getInstrumentsList() {
    return this.useCases.getInstruments(this.state.listFilter);
  }

}
