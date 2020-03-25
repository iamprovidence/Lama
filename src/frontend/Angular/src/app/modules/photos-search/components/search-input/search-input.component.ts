import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements OnInit {
  @Output()
  public searchEvent = new EventEmitter<string>();

  @Output()
  public isFocusedEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  public search(searchInput: string): void {
    this.searchEvent.emit(searchInput);
  }

  public focus(): void {
    this.isFocusedEvent.emit(true);
  }

  public focusout(): void {
    this.isFocusedEvent.emit(false);
  }
}
