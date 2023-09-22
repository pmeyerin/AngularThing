import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from "../session.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ForumService} from "../forum.service";
import {ActivatedRoute} from "@angular/router";
import {ForumPost} from "../forum-post";
import {ForumTopic} from "../forum-topic";

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
      <section *ngIf="sessionService.isLoggedIn()" xmlns="http://www.w3.org/1999/html" class="forum-form">
      <h3>Add a post</h3>
      <div class="post-form">
        <form [formGroup]="postForm" (submit)="submitReply()">
          <input class="post-input" id="post-title" type="text" formControlName="postTitle" placeholder="post title (topic title on new topic)" ><br>
          <textarea class="post-textarea" id="post-text" formControlName="postText" placeholder="Text of post (please no HTML injection)"></textarea><br>

          <button type="button" (click)="submitTopic()">Post new topic</button>
          <button *ngIf="topicId && topicId > 0" type="submit">Reply to this topic</button>
        </form>
      </div>
    </section>
    <section *ngIf="!sessionService.isLoggedIn()" class="forum-form">
      <h3>Please log in to make your own posts</h3>
    </section>
  `,
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  @Input() topicList!: ForumTopic[];
  route: ActivatedRoute = inject(ActivatedRoute);
  sessionService: SessionService = inject(SessionService);
  forumService: ForumService = inject(ForumService);

  postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(''),
    postText: new FormControl(''),
  })

  topicId: Number = -1;

  constructor() {
    this.topicId = Number(this.route.snapshot.params['topicId']);
  }

  submitReply() {
    this.forumService.submitReply(
      this.topicId,
      this.postForm.value.postTitle ?? '',
      this.postForm.value.postText ?? '',
      this.sessionService.loggedInUser,
    );
    this.forumService.listTopics()
        .subscribe(value => {
          this.topicList = value;
        });
  }

  submitTopic() {
    this.forumService.submitTopic(
      this.postForm.value.postTitle ?? '',
      this.postForm.value.postText ?? '',
      this.sessionService.loggedInUser,
    )
  }

}
