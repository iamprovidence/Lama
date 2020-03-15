import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ValueProvider } from '@angular/core';

export class ParameterizedRouteGuard<T> implements CanActivate {
  public static Provider<T>(): ValueProvider {
    return {
      provide: ParameterizedRouteGuard,
      useValue: new ParameterizedRouteGuard<T>()
    };
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.hasData(route.data)) throw new Error('Route data is required');
    if (!this.isCorrentDataType(route.data)) throw new Error('Route data has wrong type');

    return true;
  }

  private hasData(data: any): boolean {
    return Object.keys(data).length !== 0;
  }

  private isCorrentDataType(data: any): data is T {
    return (data as T) !== undefined;
  }
}
