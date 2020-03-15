import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { CommentsEffects as Effects } from './store/effects';

import { CommentsService as ApiService } from './comments.service';

import { CommentsComponent } from './containers/comments/comments.component';
import { AddCommentFormComponent } from './components/add-comment-form/add-comment-form.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';

const components = [CommentsComponent, AddCommentFormComponent, CommentsListComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [SharedModule, StoreModule.forFeature(SLICE_NAME, reducer), EffectsModule.forFeature([Effects])],
  providers: [ApiService]
})
export class CommentsModule {}
