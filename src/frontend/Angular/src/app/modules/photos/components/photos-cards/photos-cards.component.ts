import { Component, OnInit, Input } from '@angular/core';

import { PhotoListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-photos-cards',
  templateUrl: './photos-cards.component.html',
  styleUrls: ['./photos-cards.component.less']
})
export class PhotosCardsComponent implements OnInit {
  @Input()
  public photos: PhotoListDTO[] = [];

  constructor() {}

  ngOnInit() {}
}
