import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent, NoContentComponent, FailedComponent } from './components';

import { LoadingDirective, PrettyImageDirective } from './directives';

const modules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const components = [LoadingComponent, NoContentComponent, FailedComponent];
const dynamicComponents = [LoadingComponent, NoContentComponent, FailedComponent];

const directives = [LoadingDirective, PrettyImageDirective];

@NgModule({
  imports: [...modules],
  declarations: [...components, ...directives],
  exports: [...modules, ...components, ...directives],
  entryComponents: [...dynamicComponents]
})
export class SharedModule {}
