import {ChangeDetectorRef, Component, inject, NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ForumService } from "../forum.service";
import { ForumTopic } from "../forum-topic";
import { PostComponent } from "../post/post.component";
import { PostFormComponent } from "../post-form/post-form.component";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    PostFormComponent,
  ],
  template: `
    <div class="forum-page">
      <div class="forum-sidebar">
        Topic list
        <hr width="100%">
        <a *ngFor="let topic of topicList" href="/forum/{{topic.id}}">{{topic.topicTitle}}</a>
      </div>
      <div class="forum-main">
        <h2 *ngIf="selectedTopic">{{selectedTopic.topicTitle}}</h2>
        <app-post *ngFor="let post of selectedTopic?.postList" [forumPost]="post"></app-post>
      </div>
      <div class="forum-form">
        <app-post-form [topicList]="topicList"></app-post-form>
      </div>
    </div>
  `,
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  forumService : ForumService = inject(ForumService);
  selectedTopic: ForumTopic | undefined;
  topicList : ForumTopic[] = [];
  private selectedTopicId: number;

  constructor() {
    this.selectedTopicId = Number(this.route.snapshot.params['topicId']);
    this.updateTopicPosts(this.selectedTopicId);
    console.log(this.selectedTopic);
    this.updateTopicList();
    // this.topicList = this.forumService.listTopics();
    this.subscribeToTopicChanges();
  }

  private updateTopicPosts(selectedTopicId: number) {
    if (selectedTopicId) {
      this.forumService.topicById(selectedTopicId)
          .subscribe(value => {
            this.selectedTopic = value;
          });
    }
  }

  private updateTopicList() {
    this.forumService.listTopics()
        .subscribe(value => {
          this.topicList = value;
        });
  }

  public subscribeToTopicChanges() {
    this.forumService.topicsUpdated.subscribe(value => {
      if (value) {
        this.updateTopicPosts(this.selectedTopicId);
        this.updateTopicList();
      }
    })
  }

}
