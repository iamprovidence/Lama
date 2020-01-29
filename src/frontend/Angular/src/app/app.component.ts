import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-pageloader> </app-pageloader>
  `
})
export class AppComponent {}
