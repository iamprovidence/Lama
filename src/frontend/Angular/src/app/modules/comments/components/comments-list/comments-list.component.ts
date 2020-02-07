import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommentListDTO, FirebaseUser, PhotoViewDTO } from 'src/app/core/models';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent implements OnInit {
  @Input()
  public loggedUser: FirebaseUser;

  @Input()
  public currentPhoto: PhotoViewDTO;

  @Input()
  public comments: CommentListDTO[];

  @Output()
  public deleteCommentEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  public canDeleteComment(comment: CommentListDTO): boolean {
    // you can delete all your comments
    // or
    // all comments on your photo
    return this.loggedUser.uid === comment.userId || this.currentPhoto.userId === this.loggedUser.uid;
  }

  public deleteComment(comment: CommentListDTO): void {
    this.deleteCommentEvent.emit(comment.id);
  }
}
