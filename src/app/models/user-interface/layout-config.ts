/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View, Layout } from './user-interface';

import { DocumentsViews,
         TransactionsViews,
         SearchViews } from './views.config';


export type LayoutType = 'Documents' | 'Transactions' | 'Search';


export const APP_VIEWS: View[] = DocumentsViews.concat(TransactionsViews,
                                                       SearchViews);

export const APP_LAYOUTS: Layout[] = [
  {
    name: 'Documents',
    views: DocumentsViews,
    hint: 'Registro de oficios y documentos',
    defaultTitle: 'Oficios y documentos'
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
