import { Component, OnInit, Input } from '@angular/core';

import { FirebaseUser } from 'src/app/core/models';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.less']
})
export class UserProfilePageComponent implements OnInit {
  @Input()
  public user: FirebaseUser;

  constructor() {}

  ngOnInit() {}
}
