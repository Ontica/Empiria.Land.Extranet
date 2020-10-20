/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */
import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface FileUploaderConfig {
  accept?: string;
  autoupload?: boolean;
}

@Component({
  selector: 'emp-ng-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnChanges {

  @Input() config: FileUploaderConfig = {};

  @Output() fileControlChange = new EventEmitter<File | null>();

  fileToUpload: File | null = null;


  ngOnChanges() {
    this.config = Object.assign({}, { accept: '', autoupload: false }, this.config);
  }


  handleFileInput(files: FileList) {
    if (!files || files.length === 0) {
      return;
    }

    const file = files.item(0);

    this.fileToUpload = file;

    this.fileControlChange.emit(file);
  }


  removeFile() {
    this.fileToUpload = null;
    this.fileControlChange.emit(null);
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    event.stopPropagation();
  }


  onDropFile(event: DragEvent): void {
    event.preventDefault();

    this.handleFileInput(event.dataTransfer.files);
    event.stopPropagation();
  }

}
