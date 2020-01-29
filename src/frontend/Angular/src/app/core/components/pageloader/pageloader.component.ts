import { Component, OnInit } from '@angular/core';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-pageloader',
  templateUrl: './pageloader.component.html',
  styleUrls: ['./pageloader.component.less']
})
export class PageloaderComponent implements OnInit {
  public showLoadingOverlay = false;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {}

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoadingOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showLoadingOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showLoadingOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showLoadingOverlay = false;
    }
  }
}
