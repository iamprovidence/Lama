import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.less']
})
export class UploadPhotosComponent implements OnInit {
  public photos: any[] = [
    {
      imageUrl: 'https://i.picsum.photos/id/250/128/128.jpg'
    },
    {
      imageUrl: 'https://i.picsum.photos/id/250/256/256.jpg'
    },
    {
      imageUrl: 'https://i.picsum.photos/id/250/320/320.jpg'
    },
    {
      imageUrl: 'https://i.picsum.photos/id/250/500/600.jpg'
    },
    {
      imageUrl: 'https://i.picsum.photos/id/250/256/256.jpg'
    }
  ];
  public isActive: boolean = false;

  constructor() {}

  ngOnInit() {}
}
