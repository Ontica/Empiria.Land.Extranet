/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';


export enum RagStatus {
  Red = 'Red',
  Amber = 'Amber',
  Green = 'Green',
  NoColor = 'NoColor'
}


@Component({
  selector: 'emp-ng-rag-status',
  template: `
    <span class="circle" [ngClass]="statusColorCssClass"
         (click)="onclick()">
    </span>
  `,
  styleUrls: ['./rag-status.component.scss']
})
export class RagStatusComponent implements OnChanges {

  statusColorCssClass = '';

  @Output() statusChange = new EventEmitter<RagStatus>();

  @Input() status: RagStatus = RagStatus.NoColor;


  ngOnChanges() {
    this.applyStatusColorCssClass();
  }


  onclick() {
    const nextColor = this.getNextColor();

    this.statusChange.emit(nextColor);
  }


  // private methods


  private applyStatusColorCssClass() {
    switch (this.status) {

      case RagStatus.Red:
        this.statusColorCssClass = 'red';
        return;

      case RagStatus.Amber:
        this.statusColorCssClass = 'amber';
        return;

      case RagStatus.Green:
        this.statusColorCssClass = 'green';
        return;

      case RagStatus.NoColor:
        this.statusColorCssClass = 'no-color';
        return;

      default:
        this.statusColorCssClass = 'no-color';
        console.log(`Unrecognized RAG-color '${this.status}'.`);
        return;
    }
  }


  private getNextColor(): RagStatus {
    switch (this.status) {

      case RagStatus.Red:
        return RagStatus.NoColor;

      case RagStatus.Amber:
        return RagStatus.Red;

      case RagStatus.Green:
        return RagStatus.Amber;

      case RagStatus.NoColor:
        return RagStatus.Green;

      default:
        throw new Error(`Unrecognized RAG-color '${this.status}'.`);
    }
  }

}
