/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { SelectorType as MainUIStateSelector } from '../state.handlers/main-ui.state.handler';
export { SelectorType as MainUIStateSelector } from '../state.handlers/main-ui.state.handler';


import { SelectorType as RequestsStateSelector } from '../state.handlers/instruments.state.handler';
export { SelectorType as RequestsStateSelector } from '../state.handlers/instruments.state.handler';


export type StateSelector = MainUIStateSelector | RequestsStateSelector;
