import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploaded-photo-item',
  templateUrl: './uploaded-photo-item.component.html',
  styleUrls: ['./uploaded-photo-item.component.less']
})
export class UploadedPhotoItemComponent implements OnInit {
  @Input()
  public photo: any;

  constructor() {}

  ngOnInit() {}
}
