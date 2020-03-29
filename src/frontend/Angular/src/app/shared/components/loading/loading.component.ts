import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {
  public loadingImageNumber: number;

  constructor() {
    this.loadingImageNumber = this.getRandomInt(4);
  }

  ngOnInit() {}

  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
