import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseUser, PhotoViewDTO, AddCommentDTO } from 'src/app/core/models';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.less']
})
export class AddCommentFormComponent implements OnInit {
  public newCommentText: string;

  @Input()
  public loggedUser: FirebaseUser;

  @Input()
  public currentPhoto: PhotoViewDTO;

  @Output()
  public addNewCommentEvent = new EventEmitter<AddCommentDTO>();

  constructor() {}

  ngOnInit() {}

  public addComment(): void {
    const createdComment: AddCommentDTO = {
      text: this.newCommentText,
      userId: this.loggedUser.uid,
      photoId: this.currentPhoto.id
    };

    this.newCommentText = null;

    this.addNewCommentEvent.emit(createdComment);
  }
}
