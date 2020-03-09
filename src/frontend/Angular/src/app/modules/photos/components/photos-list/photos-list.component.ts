import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PhotosViewBaseComponent } from '../photos-view-base/photos-view-base.components';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosListComponent extends PhotosViewBaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
