import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { PhotoViewDTO, UpdatePhotoDTO } from 'src/app/core/models';

@Component({
  selector: 'app-photo-info-view',
  templateUrl: './photo-info-view.component.html',
  styleUrls: ['./photo-info-view.component.less']
})
export class PhotoInfoViewComponent implements OnInit {
  @Input()
  public photo: PhotoViewDTO;

  @Output()
  public updatePhotoEvent = new EventEmitter<UpdatePhotoDTO>();

  @ViewChild('descriptionTextarea', { static: false })
  public descriptionTextarea: ElementRef<HTMLTextAreaElement>;

  constructor() {}

  ngOnInit() {}

  public updatePhoto(): void {
    this.updatePhotoEvent.emit({
      id: this.photo.id,
      description: this.descriptionTextarea.nativeElement.value
    });
  }
}
