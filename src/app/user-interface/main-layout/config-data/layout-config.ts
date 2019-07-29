/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View, Layout } from '../common-models/common';

import {
  InstrumentsViews,
  TransactionsViews,
  SearchViews
} from './views.config';


export type LayoutType = 'Instruments' | 'Transactions' | 'Search';


export const APP_VIEWS: View[] = InstrumentsViews.concat(TransactionsViews,
                                                         SearchViews);

export const APP_LAYOUTS: Layout[] = [
  {
    name: 'Instruments',
    views: InstrumentsViews,
    hint: 'Registro de instrumentos legales y oficios',
    defaultTitle: 'Documentos'
  },
  {
    name: 'Transactions',
    views: TransactionsViews,
    hint: 'Administración de trámites',
    defaultTitle: 'Trámites'
  },
  {
    name: 'Search',
    views: SearchViews,
    hint: 'Servicios de consulta en línea',
    defaultTitle: 'Consulta'
  }
];
