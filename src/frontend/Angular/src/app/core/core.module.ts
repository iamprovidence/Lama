import { NgModule, Optional, SkipSelf } from '@angular/core';

import { EnsureModuleLoadedOnceGuard } from './guards';

import { HttpClientModule } from '@angular/common/http';
import { PageloaderComponent } from './components';

import { EventBusService } from './eventBus';

@NgModule({
  imports: [HttpClientModule],
  declarations: [PageloaderComponent],
  providers: [EventBusService],
  exports: [PageloaderComponent]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
