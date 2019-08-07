/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, CommandResult, toPromise } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { RepositoryUseCases } from '@app/domain/use-cases';


export enum ActionType {
  LOAD_REAL_ESTATE = 'Land.UI-Action.Repository.LoadRealEstate'
}


export enum SelectorType {

}


enum CommandEffectType {

}


export interface RepositoryState {

}


const initialState: StateValues = [

];

@Injectable()
export class RepositoryStateHandler extends AbstractStateHandler<RepositoryState> {

  constructor(private repository: RepositoryUseCases) {
    super(initialState, SelectorType, ActionType, CommandEffectType);
  }


  get state(): RepositoryState {
    return {

    };
  }


  applyEffects(command: CommandResult): void {
    switch ((command.type as any) as CommandEffectType) {

      default:
        throw this.unhandledCommandOrActionType(command);
    }
  }


  dispatch<U>(actionType: ActionType, payload?: any): Promise<U> | void {
    switch (actionType) {

      case ActionType.LOAD_REAL_ESTATE:
        Assertion.assertValue(payload.uid, 'payload.uid');

        return toPromise<U>(
          this.repository.getRealEstate(payload.uid)
        );

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }

}
