/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { View } from './user-interface';


export const DocumentsViews: View[] = [
  {
    name: 'Documents.Pending',
    title: 'Documentos abiertos',
    menuTitle: 'Abiertos',
    url: '/documents/pending'
  },
  {
    name: 'Documents.Signed',
    title: 'Documentos firmados',
    menuTitle: 'Firmados',
    url: '/documents/signed'
  },
  {
    name: 'Documents.Sent',
    title: 'Documentos tramitados',
    menuTitle: 'Tramitados',
    url: '/documents/requested'
  }
];


export const TransactionsViews: View[] = [
  {
    name: 'Transactions.Pending',
    title: 'Trámites pendientes',
    menuTitle: 'Pendientes',
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
    title: 'Resultados de la consulta',
    menuTitle: '',
    url: '/search/all'
  },
  {
    name: 'Search.RealEstate',
    title: 'Índice de propiedades',
    menuTitle: 'Propiedades',
    url: '/search/real-estate'
  },
  {
    name: 'Search.Persons',
    title: 'Índice de personas',
    menuTitle: 'Personas',
    url: '/search/persons'
  },
  {
    name: 'Search.Associations',
    title: 'Asociaciones y sociedades civiles',
    menuTitle: 'Asociaciones',
    url: '/search/associations'
  },
  {
    name: 'Search.Documents',
    title: 'Documentos',
    url: '/search/documents'
  },
  {
    name: 'Search.Certificates',
    title: 'Certificados',
    url: '/search/certificates'
  },
  {
    name: 'Search.Transactions',
    title: 'Trámites',
    url: '/search/transactions'
  },
  {
    name: 'Search.Books',
    title: 'Libros',
    url: '/search/books'
  }
];
