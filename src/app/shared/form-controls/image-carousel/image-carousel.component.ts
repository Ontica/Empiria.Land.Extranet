/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { Media } from './media.interface';


@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {

  currentImagePointer = 0;
  zoom = 1;
  mediaList: Media[]  = [];
  isManifierGlass = false;  
  
 
  constructor(private changeDetectorRef: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.onFirstClick();    
  }

  
  onPreviousClick(): void {
   let previous = this.currentImagePointer - 1;

   if (previous < 0) {
    this.currentImagePointer = this.mediaList.length - 1
   } else {
    this.currentImagePointer = previous;
   }  

  }


  onNextClick(): void {
    let next = this.currentImagePointer + 1;

    if (next == this.mediaList.length) {
      this.currentImagePointer = 0;
    } else {
      this.currentImagePointer = next;
    } 
      
  }


  onFirstClick(): void {
    this.currentImagePointer = 0;
  }


  onGoToPageClick(imageNumber: string): void {    
    if ((+imageNumber > 0) && (+imageNumber <= this.mediaList.length)) {
      this.currentImagePointer = +imageNumber -1;
    }

  }


  onZoomInClick(): void {
    let zoomIn = this.zoom - .10;

    if (zoomIn >= .50) {
      this.zoom = zoomIn;
    } else {
      this.zoom = .50;
    }
    
  }


  onZoomOutClick(): void {
    let zoomOut = this.zoom +.20;

    if (zoomOut <= 3) {
      this.zoom = zoomOut;
    } else {
      this.zoom = 3.0;
    }
    
  }
  

  @ViewChild('contentPlaceholder', { static: false }) 
    contentPlaceholder: ElementRef;
  @ViewChild('myimage', { static: false }) myimage:ElementRef;


  onManifierGlassClick(): void {     
    this.isManifierGlass = !this.isManifierGlass; 

    if (this.isManifierGlass) {
      this.changeDetectorRef.detectChanges();
      this.magnify("myimage",3);         
    } 

  }
 

  magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);

    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    img.parentElement.insertBefore(glass, img);

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize =
      img.width * zoom + "px " + img.height * zoom + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
   
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    
    function moveMagnifier(e) {
      var pos, x, y;
      
      e.preventDefault();
      
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
     
      if (x > img.width - w / zoom) {
        x = img.width - w / zoom;
      }
      if (x < w / zoom) {
        x = w / zoom;
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom;
      }
      if (y < h / zoom) {
        y = h / zoom;
      }
     
      glass.style.left = x - w + "px";
      glass.style.top = y - h + "px";
      
      glass.style.backgroundPosition =
        "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
    }

    function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
    
      a = img.getBoundingClientRect();
      
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

}
