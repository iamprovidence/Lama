import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

import { CreateAlbumDTO } from 'src/app/core/models';

@Component({
  selector: 'app-create-album-view',
  templateUrl: './create-album-view.component.html',
  styleUrls: ['./create-album-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAlbumViewComponent implements OnInit {
  @Input()
  public isActive: boolean;

  @Output()
  public closeModalEvent = new EventEmitter();

  @Output()
  public createAlbumEvent = new EventEmitter<CreateAlbumDTO>();

  public albumName: string;

  @ViewChild('name', { static: true })
  public albumNameInput: NgModel;

  constructor() {}

  ngOnInit() {}

  public closeModal(): void {
    this.closeModalEvent.emit();
  }

  public createAlbum(): void {
    this.createAlbumEvent.emit({ title: this.albumName });
    this.albumNameInput.reset();
  }
}
