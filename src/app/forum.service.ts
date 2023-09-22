import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ForumTopic } from "./forum-topic";
import { ForumPost } from "./forum-post";
import {Observable, Subject, tap} from "rxjs";
const { DateTime } = require("luxon");

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  url = 'http://localhost:3000/topics'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public topicsUpdated: Subject<boolean>;

  http: HttpClient = inject(HttpClient);

  private nextTopicId = 1;
  constructor() {
      this.topicsUpdated = new Subject<boolean>();
      this.listTopics()
        .subscribe(value => {
          this.nextTopicId = value.length+1;
        })
  }

  listTopics(): Observable<ForumTopic[]> {
    return this.http.get<ForumTopic[]>(this.url);
  }

  topicById(topicId: Number): Observable<ForumTopic | undefined> {
    return this.http.get<ForumTopic>(`${this.url}/${topicId}`) ?? {};
  }

  submitReply(topicId: Number, postTitle: string, postText: string, userId: string) {
    const formattedNow = DateTime.now().toISO();
    const newPost: ForumPost = {
      postTitle: postTitle,
      postText: postText,
      author: userId,
      timestamp: formattedNow,
    }
    console.log("fetching existing record...");
    return this.topicById(topicId)
        .subscribe(value => {
          console.log("got existing record, now to update it");
          let updateTopic: ForumTopic | undefined = value;
          updateTopic?.postList.push(newPost);
          this.http.put<ForumTopic>(`${this.url}/${topicId}`, updateTopic, this.httpOptions)
              .subscribe(value1 => {
                  console.log("did update");
                  this.topicsUpdated.next(true);
              });
        });
  }

  submitTopic(postTitle: string, postText: string, loggedInUser: string) {
    const formattedNow = DateTime.now().toISO();
    const newTopic: ForumTopic = {
      id: this.nextTopicId++,
      topicTitle: postTitle,
      postList: [{
          postTitle: postTitle,
          postText: postText,
          author: loggedInUser,
          timestamp: formattedNow,
      }]
    }
    return this.http.post(this.url, newTopic, this.httpOptions)
        .subscribe(value => {
            console.log("new topic");
            this.topicsUpdated.next(true);
        })
  }
}
