import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { PhotoToUploadDTO } from 'src/app/core/models';

@Component({
  selector: 'app-uploaded-photo-item',
  templateUrl: './uploaded-photo-item.component.html',
  styleUrls: ['./uploaded-photo-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadedPhotoItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public photo: PhotoToUploadDTO;

  @Output()
  public removePhotoEvent = new EventEmitter<string>();

  @Output()
  public updatePhotoEvent = new EventEmitter<PhotoToUploadDTO>();

  @ViewChild('textarea', { static: false })
  public textarea: ElementRef;

  private unsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    fromEvent(this.textarea.nativeElement, 'keyup')
      .pipe(
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(this.updateDescription.bind(this));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onRemovePhoto(photoName: string): void {
    this.removePhotoEvent.emit(photoName);
  }

  private updateDescription(newDescription: string): void {
    this.updatePhotoEvent.emit({ ...this.photo, description: newDescription });
  }
}
