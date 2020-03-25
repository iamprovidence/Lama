import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ImageFilterDTO } from 'src/app/core/models';

@Component({
  selector: 'app-filters-tab',
  templateUrl: './filters-tab.component.html',
  styleUrls: ['./filters-tab.component.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FiltersTabComponent implements OnInit {
  @Input()
  public filtersThumbnails: ImageFilterDTO[];

  @Output()
  public filterSelectedEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public selectFilter(filterIndex: number): void {
    this.filterSelectedEvent.emit(filterIndex);
  }
}
