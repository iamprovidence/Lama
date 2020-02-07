import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

@Component({
  selector: 'app-photo-details-modal',
  templateUrl: './photo-details-modal.component.html',
  styleUrls: ['./photo-details-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailsModalComponent implements OnInit {
  @Input()
  public isLoading: DataState;

  @Input()
  public photo: PhotoViewDTO;

  @Output()
  public closeModalEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
