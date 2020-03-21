import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-notification-button-view',
  templateUrl: './notification-button-view.component.html',
  styleUrls: ['./notification-button-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationButtonViewComponent implements OnInit {
  @Input()
  public notificationsAmount: number;

  constructor() {}

  ngOnInit() {}
}
