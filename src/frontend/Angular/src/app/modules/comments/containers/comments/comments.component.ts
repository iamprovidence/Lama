import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Actions from '../../store/actions';
import * as fromComment from '../../store/selectors';
import * as fromPhoto from 'src/app/modules/photo-details/store/details/selectors';
import * as fromUser from 'src/app/modules/authentication/store/selectors';

import { DataState } from 'src/app/core/enums';
import { FirebaseUser, PhotoViewDTO, CommentListDTO, AddCommentDTO } from 'src/app/core/models';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<DataState>;
  public loggedUser$: Observable<FirebaseUser>;
  public currentPhoto$: Observable<PhotoViewDTO>;
  public comments$: Observable<CommentListDTO[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromComment.getIsLoading);
    this.loggedUser$ = this.store.select(fromUser.getUser);
    this.currentPhoto$ = this.store.select(fromPhoto.getPhoto);
    this.comments$ = this.store.select(fromComment.getComments);

    this.currentPhoto$
      .pipe(
        take(1), // unsubscribe
        filter(val => !!val)
      )
      .subscribe(photo => {
        this.store.dispatch(new Actions.LoadComments(photo.id));
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new Actions.ClearComments());
  }

  public deleteComment(commentId: number): void {
    this.store.dispatch(new Actions.DeleteComment(commentId));
  }

  public addComment(comment: AddCommentDTO): void {
    this.store.dispatch(new Actions.AddComment(comment));
  }
}
