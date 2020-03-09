import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { ColorAdjustmentstDTO } from 'src/app/core/models';

@Component({
  selector: 'app-adjust-tab',
  templateUrl: './adjust-tab.component.html',
  styleUrls: ['./adjust-tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdjustTabComponent implements OnInit {
  @Input()
  public colorAdjustments: ColorAdjustmentstDTO;

  @Output()
  public colorAdjustmentsChangedEvent = new EventEmitter<ColorAdjustmentstDTO>();

  constructor() {}

  ngOnInit() {}

  public brightnessChanged(value: string): void {
    const colorAdjustments = { ...this.colorAdjustments, brightness: Number(value) };

    this.colorAdjustmentsChangedEvent.emit(colorAdjustments);
  }

  public contrastChanged(value: string): void {
    const colorAdjustments = { ...this.colorAdjustments, contrast: Number(value) };

    this.colorAdjustmentsChangedEvent.emit(colorAdjustments);
  }
}
