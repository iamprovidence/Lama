import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './components';

import { LoadingDirective } from './directives';

const modules = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const components = [LoadingComponent];
const dynamicComponents = [LoadingComponent];

const directives = [LoadingDirective];

@NgModule({
  imports: [...modules],
  declarations: [...components, ...directives],
  exports: [...modules, ...components, ...directives],
  entryComponents: [...dynamicComponents]
})
export class SharedModule {}
