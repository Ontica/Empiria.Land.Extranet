/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, Cache, Identifiable } from '@app/core';

import { AbstractStateHandler, StateValues } from '@app/core/presentation/state-handler';

import { RepositoryUseCases } from '@app/domain/use-cases';
import { RealEstate } from '@app/domain/models';


export enum SelectorType {
  DISTRICT_LIST = 'Land.UI-Item.Repository.DistrictList',
  DISTRICT_MUNICIPALITY_LIST = 'Land.UI-Item.Repository.DistrictMuncipalityList',
  DISTRICT_DOMAIN_RECORDING_BOOKS_LIST = 'Land.UI-Item.Repository.DistrictDomainRecordingBooksList',
  REAL_ESTATE = 'Land.UI-Action.Repository.RealEstate',
  REAL_ESTATE_TYPE_LIST = 'Land.UI-Item.Repository.RealEstateTypeList',
}


const initialState: StateValues = [
  { key: SelectorType.DISTRICT_LIST, value: [] },
  { key: SelectorType.DISTRICT_MUNICIPALITY_LIST, value: new Cache<Identifiable[]>()},
  { key: SelectorType.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST, value: new Cache<Identifiable[]>() },
  { key: SelectorType.REAL_ESTATE, value: new Cache<RealEstate[]>() },
  { key: SelectorType.REAL_ESTATE_TYPE_LIST, value: [] }
];


@Injectable()
export class RepositoryStateHandler extends AbstractStateHandler {

  constructor(private repository: RepositoryUseCases) {
    super({ initialState, selectors: SelectorType });
  }


  select<U>(selectorType: SelectorType, params?: any): Observable<U> {
    switch (selectorType) {

      case SelectorType.DISTRICT_LIST:
        return super.selectFirst<U>(selectorType,
                                    () => this.repository.getRecorderOfficeList());


      case SelectorType.DISTRICT_MUNICIPALITY_LIST:
        Assertion.assertValue(params.districtUID, 'params.districtUID');

        return super.selectMemoized<U>(selectorType,
                                       () => this.repository.getRecorderOfficeMunicipalityList(params.districtUID),
                                       params.districtUID);


      case SelectorType.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST:
        Assertion.assertValue(params.districtUID, 'params.districtUID');

        return super.selectMemoized<U>(selectorType,
                                       () => this.repository.getRecorderOfficeDomainBookList(params.districtUID),
                                       params.districtUID);


      case SelectorType.REAL_ESTATE:
        Assertion.assertValue(params.uid, 'params.uid');

        return super.selectMemoized<U>(selectorType,
                                       () => this.repository.getRealEstate(params.uid),
                                       params.uid);

      case SelectorType.REAL_ESTATE_TYPE_LIST:
        return super.selectFirst<U>(selectorType,
                                    () => this.repository.getRealEstateTypeList());


      default:
        return super.select<U>(selectorType, params);

    }
  }

}
