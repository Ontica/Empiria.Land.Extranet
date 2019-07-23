/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Action, Assertion, CommandHandler} from '@app/core';

import { ElectronicSignService } from '@app/services';


@Injectable()
export class ElectronicSignCommandHandler extends CommandHandler {

  readonly types = ['LAND.LEGAL.INSTRUMENT.SIGNED', 'LAND.LEGAL.INSTRUMENT.SIGN.REVOKED'];


  constructor(private service: ElectronicSignService) {
    super();
  }


  execute(action: Action): Promise<any> {
    switch (action.type) {

      case 'LAND.LEGAL.INSTRUMENT.SIGNED':
        return this.service.signInstrument(action.payload.instrument, action.payload.token)
          .toPromise();

      case 'LAND.LEGAL.INSTRUMENT.SIGN.REVOKED':
        return this.service.revokeInstrumentSign(action.payload.instrument, action.payload.token)
          .toPromise();

      default:
        const msg = `${ElectronicSignCommandHandler.name} is not able to handle action ${action.type}.`;
        throw Assertion.assertNoReachThisCode(msg);
    }
  }

}
