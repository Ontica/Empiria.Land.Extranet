/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'emp-land-create-instrument-wizard',
  templateUrl: './create-instrument-wizard.component.html',
  styleUrls: ['./create-instrument-wizard.component.scss']
})
export class CreateInstrumentWizardComponent implements OnInit {

  documentType = '';

  constructor() { }

  ngOnInit() {
  }

}
