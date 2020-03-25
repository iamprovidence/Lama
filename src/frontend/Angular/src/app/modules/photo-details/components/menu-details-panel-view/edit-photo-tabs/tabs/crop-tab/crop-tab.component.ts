import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-crop-tab',
  templateUrl: './crop-tab.component.html',
  styleUrls: ['./crop-tab.component.less']
})
export class CropTabComponent implements OnInit {
  @Input()
  public width: number;

  @Input()
  public height: number;

  @Output()
  public cropImageEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public cropImage(): void {
    this.cropImageEvent.emit();
  }
}
