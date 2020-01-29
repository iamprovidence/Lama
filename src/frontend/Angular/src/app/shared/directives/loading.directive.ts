import {
  Directive,
  ComponentFactory,
  ComponentRef,
  Input,
  ViewContainerRef,
  TemplateRef,
  ComponentFactoryResolver
} from '@angular/core';
import { DataState } from 'src/app/core/enums';
import { LoadingComponent } from '../components';

@Directive({
  selector: '[isLoading]'
})
export class LoadingDirective {
  loadingFactory: ComponentFactory<LoadingComponent>;
  loadingComponent: ComponentRef<LoadingComponent>;

  @Input()
  set isLoading(loading: DataState) {
    this.vcRef.clear();

    if (loading === DataState.Loading) {
      // create and embed an instance of the loading component
      this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);
    } else {
      // embed the contents of the host template
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // Create resolver for loading component
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  }
}
