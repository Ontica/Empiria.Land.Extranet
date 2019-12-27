/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, Cache, CommandResult, toPromise, Identifiable } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { RepositoryUseCases } from '@app/domain/use-cases';
import { Observable } from 'rxjs';


export enum ActionType {
  LOAD_REAL_ESTATE = 'Land.UI-Action.Repository.LoadRealEstate'
}


export enum SelectorType {
  DISTRICT_LIST = 'Land.UI-Item.Repository.DistrictList',
  DISTRICT_MUNICIPALITY_LIST = 'Land.UI-Item.Repository.DistrictMuncipalityList',
  DISTRICT_DOMAIN_RECORDING_BOOKS_LIST = 'Land.UI-Item.Repository.DistrictDomainRecordingBooksList',
  REAL_ESTATE_TYPE_LIST = 'Land.UI-Item.Repository.RealEstateTypeList',
}


enum CommandEffectType {

}


export interface RepositoryState {
  readonly districtList: Identifiable[];
}


const initialState: StateValues = [
  { key: SelectorType.DISTRICT_LIST, value: [] },
  { key: SelectorType.DISTRICT_MUNICIPALITY_LIST, value: new Cache<Identifiable[]>()},
  { key: SelectorType.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST, value: [] },
  { key: SelectorType.REAL_ESTATE_TYPE_LIST, value: [] }
];


@Injectable()
export class RepositoryStateHandler extends AbstractStateHandler<RepositoryState> {

  constructor(private repository: RepositoryUseCases) {
    super(initialState, SelectorType, ActionType);
  }


  get state(): RepositoryState {
    return {
      districtList: this.getValue(SelectorType.DISTRICT_LIST)
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


  selector<U>(selectorType: SelectorType, params?: any): any {
    return () => this.repository.getRecorderOfficeList();
  }


  select<U>(selectorType: SelectorType, params?: any): Observable<U> {
    switch (selectorType) {

      case SelectorType.DISTRICT_LIST:
        return super.selectFirst<U>(selectorType,
                                    () => this.repository.getRecorderOfficeList());

      case SelectorType.DISTRICT_MUNICIPALITY_LIST:
        Assertion.assertValue(params.districtUID, 'params.districtUID');

        return super.selectCached<U>(selectorType,
                                     () => this.repository.getRecorderOfficeMuncipalityList(params.districtUID),
                                     params.districtUID);


      case SelectorType.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST:
        Assertion.assertValue(params.districtUID, 'params.districtUID');

        return super.selectCached<U>(selectorType,
                                     () => this.repository.getRecorderOfficeDomainBookList(params.districtUID),
                                     params.districtUID);


      case SelectorType.REAL_ESTATE_TYPE_LIST:
        return super.selectFirst<U>(SelectorType.REAL_ESTATE_TYPE_LIST,
                                    () => this.repository.getRealEstateTypeList());

      default:
        return super.select<U>(selectorType, params);

    }

  }

}
