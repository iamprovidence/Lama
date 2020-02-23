import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DataState } from 'src/app/core/enums';
import { SearchHistoryListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchHistoryComponent implements OnInit {
  @Input()
  public isLoading: DataState;

  @Input()
  public isOpen: boolean;

  @Input()
  public searchHistory: SearchHistoryListDTO[];

  @Output()
  public searchEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public search(searchItem: SearchHistoryListDTO): void {
    this.searchEvent.emit(searchItem.text);
  }
}
