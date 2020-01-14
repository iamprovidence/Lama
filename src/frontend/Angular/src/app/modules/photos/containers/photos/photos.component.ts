import { Component, OnInit } from '@angular/core';

import { PhotoListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.less']
})
export class PhotosComponent implements OnInit {
  public photos: PhotoListDTO[];

  public viewType = 1;

  constructor() {}

  ngOnInit() {
    const photos = [];
    for (let i = 100; i < 256; i++) {
      photos.push({
        photoUrl256: `https://i.picsum.photos/id/${i}/256/256.jpg`,
        photoUrl32: `https://i.picsum.photos/id/${i}/32/32.jpg`
      });
    }

    this.photos = photos;
  }

  public changeView(viewType: number): void {
    this.viewType = viewType;
  }
}
