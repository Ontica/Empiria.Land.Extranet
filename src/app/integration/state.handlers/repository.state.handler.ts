/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, Cache, CommandResult, toPromise, Identifiable } from '@app/core';

import { AbstractStateHandler, StateValues, SelectorConfig } from '@app/core/presentation/state-handler';

import { RepositoryUseCases } from '@app/domain/use-cases';


export enum ActionType {
  LOAD_REAL_ESTATE = 'Land.UI-Action.Repository.LoadRealEstate'
}


export enum SelectorType {
  DISTRICT_LIST = 'Land.UI-Item.Repository.DistrictList',
  DISTRICT_MUNICIPALITY_LIST = 'Land.UI-Item.Repository.DistrictMuncipalityList',
  DISTRICT_DOMAIN_RECORDING_BOOKS_LIST = 'Land.UI-Item.Repository.DistrictDomainRecordingBooksList',
  REAL_ESTATE_TYPE_LIST = 'Land.UI-Item.Repository.RealEstateTypeList',
}


@Injectable()
export class RepositoryStateHandler extends AbstractStateHandler {

  constructor(private repository: RepositoryUseCases) {
    super({ selectors: SelectorType, actions: ActionType });
  }


  applyEffects(command: CommandResult): void {
    throw this.unhandledCommandOrActionType(command);
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


  protected getSelectorConfig(selector: SelectorType): SelectorConfig {
    switch (selector) {
      case SelectorType.DISTRICT_LIST:
        return { initialState: [] };

      case SelectorType.DISTRICT_MUNICIPALITY_LIST:
        return { initialState: new Cache<Identifiable[]>() };

      case SelectorType.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST:
        return { initialState: new Cache<Identifiable[]>() };

      case SelectorType.REAL_ESTATE_TYPE_LIST:
        return { initialState: [] };

      default:
        throw this.unhandledCommandOrActionType(selector);
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
        return super.selectFirst<U>(selectorType,
                                    () => this.repository.getRealEstateTypeList());


      default:
        return super.select<U>(selectorType, params);

    }

  }

}
