import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnectionBuilder, HubConnection, HttpTransportType } from '@aspnet/signalr';

import { Store } from '@ngrx/store';
import { State } from '../../store/state';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { PhotosData } from '@core/routes-data';
import { PhotoListDTO, PhotoThumbnailDTO } from '@core/models';
import { PhotoViewType, DataState, PhotosType } from '@core/enums';

import { AuthService } from '@app/modules/authentication/auth.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.less']
})
export class PhotosComponent implements OnInit, OnDestroy {
  public photos$: Observable<PhotoListDTO[]>;
  public viewType$: Observable<PhotoViewType>;
  public isLoading$: Observable<DataState>;
  public selected$: Observable<Set<string>>;

  private hubConnection: HubConnection;
  constructor(private store: Store<State>, private route: ActivatedRoute, authService: AuthService) {
    // TODO: connect via gateway
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:2710/PhotosHub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () =>
          authService
            .getCurrentUserToken()
            .pipe(take(1))
            .toPromise()
      })
      .build();
  }

  ngOnInit() {
    this.registerHubs();

    this.photos$ = this.store.select(Selectors.getPhotos);
    this.viewType$ = this.store.select(Selectors.getViewType);
    this.isLoading$ = this.store.select(Selectors.getIsLoading);
    this.selected$ = this.store.select(Selectors.getSelectedPhotos);

    this.LoadPhotos(this.route.snapshot.data as PhotosData);
  }

  private registerHubs(): void {
    this.hubConnection.start();

    this.hubConnection.on('updateThumbnails', this.updateThumbnails.bind(this));
  }
  
  private LoadPhotos(photosRouteData: PhotosData): void {
    const { photosType } = photosRouteData;

    switch (photosType) {
      case PhotosType.All:
        this.store.dispatch(new Actions.LoadPhotos());
        break;
      case PhotosType.Shared:
        this.store.dispatch(new Actions.LoadSharedPhotos());
        break;
      case PhotosType.Search /* Loads on effect */:
        break;
      default:
        throw new Error('Invalid enum type');
    }
  }

  ngOnDestroy() {
    this.hubConnection.stop();

    this.store.dispatch(new Actions.ClearPhotos());
  }

  public changeView(viewType: PhotoViewType): void {
    this.store.dispatch(new Actions.SetViewType(viewType));
  }

  public selectPhoto(photoId: string): void {
    this.store.dispatch(new Actions.SelectPhoto(photoId));
  }

  public deleteSelectedPhotos(): void {
    this.store.dispatch(new Actions.DeleteSelectedPhotos());
  }

  public downloadSelectedPhotos(): void {
    this.store.dispatch(new Actions.DownloadSelectedPhotos());
  }

  private updateThumbnails(thumbnails: PhotoThumbnailDTO[]): void {
    this.store.dispatch(new Actions.UpdateThumbnails(thumbnails));
  }
}
