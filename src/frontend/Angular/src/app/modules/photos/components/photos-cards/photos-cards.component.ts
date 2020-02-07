import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PhotosViewBaseComponent } from '../photos-view-base/photos-view-base.components';

@Component({
  selector: 'app-photos-cards',
  templateUrl: './photos-cards.component.html',
  styleUrls: ['./photos-cards.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosCardsComponent extends PhotosViewBaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
