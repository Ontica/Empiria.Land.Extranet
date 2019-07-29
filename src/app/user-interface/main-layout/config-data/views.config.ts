/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from '../common-models/common';


export const InstrumentsViews: View[] = [
  {
    name: 'Instruments.Pending',
    title: 'Documentos en elaboración',
    menuTitle: 'En elaboración',
    url: '/documents/pending'
  },
  {
    name: 'Instruments.Signed',
    title: 'Documentos firmados',
    menuTitle: 'Firmados',
    url: '/documents/signed'
  },
  {
    name: 'Instruments.Requested',
    title: 'Documentos tramitados',
    menuTitle: 'Tramitados',
    url: '/documents/requested'
  },
  {
    name: 'Instruments.All',
    title: 'Todos los documentos',
    menuTitle: 'Todos',
    url: '/documents/all'
  }
];


export const TransactionsViews: View[] = [
  {
    name: 'Transactions.Pending',
    title: 'Trámites pendientes',
    menuTitle: 'Trámites pendientes',
    url: '/transactions/pending'
  },
  {
    name: 'Transactions.Payment',
    title: 'Trámites en pago',
    menuTitle: 'En pago',
    url: '/transactions/payment'
  },
  {
    name: 'Transactions.Processing',
    title: 'Trámites ingresados',
    menuTitle: 'Ingresados',
    url: '/transactions/process'
  },
  {
    name: 'Transactions.Finished',
    title: 'Trámites finalizados',
    menuTitle: 'Finalizados',
    url: '/transactions/finished'
  },
  {
    name: 'Transactions.Returned',
    title: 'Trámites devueltos',
    menuTitle: 'Devueltos',
    url: '/transactions/returned'
  },
  {
    name: 'Transactions.All',
    title: 'Todos los trámites',
    menuTitle: 'Todos',
    url: '/transactions/all'
  }
];


export const SearchViews: View[] = [
  {
    name: 'Search.All',
    title: 'Búsqueda general',
    menuTitle: 'Todo',
    url: '/search-services/all'
  },
  {
    name: 'Search.RealEstate',
    title: 'Índice de propiedades',
    menuTitle: 'Propiedades',
    url: '/search-services/real-estate'
  },
  {
    name: 'Search.Persons',
    title: 'Índice de personas',
    menuTitle: 'Personas',
    url: '/search-services/persons'
  },
  {
    name: 'Search.Associations',
    title: 'Asociaciones y sociedades civiles',
    menuTitle: 'Asociaciones',
    url: '/search-services/associations'
  },
  {
    name: 'Search.Documents',
    title: 'Documentos',
    url: '/search-services/documents'
  },
  {
    name: 'Search.Certificates',
    title: 'Certificados',
    url: '/search-services/certificates'
  },
  {
    name: 'Search.Transactions',
    title: 'Trámites',
    url: '/search-services/transactions'
  },
  {
    name: 'Search.Books',
    title: 'Libros',
    url: '/search-services/books'
  }
];
