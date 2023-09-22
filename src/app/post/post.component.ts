import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumPost } from "../forum-post";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <section>
      <div class="post-header">
        <b>{{forumPost.postTitle}} by {{forumPost.author}}</b>
        <p>{{forumPost.timestamp}}</p>
      </div>
      <p>{{forumPost.postText}}</p>
    </section>
  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() forumPost!: ForumPost;
  constructor() { }

}
