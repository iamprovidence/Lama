import { Component, OnInit, Input } from '@angular/core';
import { PhotoListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.less']
})
export class PhotosListComponent implements OnInit {
  @Input()
  public photos: PhotoListDTO[] = [];

  constructor() {}

  ngOnInit() {}
}
