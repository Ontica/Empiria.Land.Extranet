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

import { LegalInstrument, LegalInstrumentFilter, EmptyLegalInstrumentFilter } from '@app/domain/models';


export enum ActionType {
  SET_INSTRUMENT_FILTER = 'LAND.LEGAL-INSTRUMENTS-LIST.SET-FILTER',
}


export enum SelectorType {
  INSTRUMENT_LIST = 'LAND.LEGAL-INSTRUMENTS-LIST',
  LIST_FILTER = 'LAND.LEGAL-INSTRUMENTS.FILTER'
}

export enum CommandEffectType {
  CREATE_PREVENTIVE_NOTE = 'LAND.PREVENTIVE.NOTE.CREATE',
  UPDATE_PREVENTIVE_NOTE = 'LAND.PREVENTIVE.NOTE.UPDATE'
}


export interface State {
  readonly instrumentsList: LegalInstrument[];
  readonly listFilter: LegalInstrumentFilter;
}


const stateMap: StateValues = [
  { key: SelectorType.INSTRUMENT_LIST, value: [] },
  { key: SelectorType.LIST_FILTER, value: EmptyLegalInstrumentFilter }
];


@Injectable()
export class InstrumentsStateHandler extends AbstractStateHandler<State> {

  constructor(private useCases: InstrumentUseCases) {
    super(stateMap, SelectorType, ActionType, CommandEffectType);
  }


  get state(): State {
    return {
      instrumentsList: this.getValue(SelectorType.INSTRUMENT_LIST),
      listFilter: this.getValue(SelectorType.LIST_FILTER)
    };
  }


  applyEffects(command: CommandResult): void {
    switch (command.type as CommandEffectType) {

      case CommandEffectType.CREATE_PREVENTIVE_NOTE:
      case CommandEffectType.UPDATE_PREVENTIVE_NOTE:
        this.setValue(SelectorType.INSTRUMENT_LIST, this.getInstrumentsList());
        return;

      default:
        const msg = `${InstrumentsStateHandler.name} is not able to handle command ${command.type}.`;

        throw Assertion.assertNoReachThisCode(msg);
    }
  }


  dispatch(actionType: ActionType, payload?: any): void {
    switch (actionType) {
      case ActionType.SET_INSTRUMENT_FILTER:
        console.log('dispatch', payload);

        Assertion.assertValue(payload.filter, 'payload.filter');

        this.setValue(SelectorType.LIST_FILTER, payload.filter);
        this.setValue(SelectorType.INSTRUMENT_LIST, this.getInstrumentsList());

        return;

      default:
        const msg = `${InstrumentsStateHandler.name} is not able to handle action ${actionType}.`;

        throw Assertion.assertNoReachThisCode(msg);
    }
  }


  // private methods


  private getInstrumentsList() {
    return this.useCases.getInstruments(this.state.listFilter);
  }

}
