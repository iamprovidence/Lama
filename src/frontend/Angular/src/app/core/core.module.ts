import { NgModule, Optional, SkipSelf } from '@angular/core';

import { EnsureModuleLoadedOnceGuard } from './guards';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  exports: [],
  providers: []
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
