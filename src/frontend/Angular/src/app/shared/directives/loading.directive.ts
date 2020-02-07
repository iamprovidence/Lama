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
import { LoadingComponent, FailedComponent, NoContentComponent } from '../components';

@Directive({
  selector: '[appIsLoading]'
})
export class LoadingDirective {
  loadingFactory: ComponentFactory<LoadingComponent>;
  loadingComponent: ComponentRef<LoadingComponent>;

  @Input()
  set appIsLoading(loading: DataState) {
    this.vcRef.clear();

    switch (loading) {
      case DataState.Loading:
        this.showLoadingScreen();
        break;
      case DataState.DisplayContent:
        this.showContentScreen();
        break;
      case DataState.Failed:
        this.showErrorScreen();
        break;
      case DataState.NoContent:
      default:
        this.showNoContentScreen();
        break;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  private showLoadingScreen(): void {
    const viewFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);

    this.vcRef.createComponent(viewFactory);
  }

  private showNoContentScreen(): void {
    const viewFactory = this.componentFactoryResolver.resolveComponentFactory(NoContentComponent);

    this.vcRef.createComponent(viewFactory);
  }

  private showErrorScreen(): void {
    const viewFactory = this.componentFactoryResolver.resolveComponentFactory(FailedComponent);

    this.vcRef.createComponent(viewFactory);
  }

  private showContentScreen(): void {
    this.vcRef.createEmbeddedView(this.templateRef);
  }
}
