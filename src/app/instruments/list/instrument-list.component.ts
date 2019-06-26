import { Component, OnInit } from '@angular/core';
import { LegalInstrument } from '@app/models/registration';

@Component({
  selector: 'emp-land-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: [
    '../../../styles/card.scss',
    '../../../styles/list.scss'
  ]
})
export class InstrumentListComponent implements OnInit {

  title = 'Documentos abiertos';
  hint = 'Ningún documento encontrado';
  filter = '';

  instrumentList = [];

  constructor() { }

  ngOnInit() {
  }


  isSelected(instrument: LegalInstrument) {

  }

  onCreate() {

  }


  onFilterChange() {

  }


  onSelect(instrument: LegalInstrument) {

  }

}
