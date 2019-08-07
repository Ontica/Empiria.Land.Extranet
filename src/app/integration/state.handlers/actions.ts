/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { ActionType as MainUIStateAction } from '../state.handlers/main-ui.state.handler';
export { ActionType as MainUIStateAction } from '../state.handlers/main-ui.state.handler';


import { ActionType as InstrumentsStateAction } from '../state.handlers/instruments.state.handler';
export { ActionType as InstrumentsStateAction } from '../state.handlers/instruments.state.handler';

import { ActionType as RepositoryStateAction } from './repository.state.handler';
export { ActionType as RepositoryStateAction } from './repository.state.handler';


export type StateAction
  =  MainUIStateAction
  | InstrumentsStateAction
  | RepositoryStateAction
;
