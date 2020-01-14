import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload-photos-modal',
  templateUrl: './upload-photos-modal.component.html',
  styleUrls: ['./upload-photos-modal.component.less']
})
export class UploadPhotosModalComponent implements OnInit {
  @Input()
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
  @Input()
  public isActive: boolean = true;

  constructor() {}

  ngOnInit() {}
}
