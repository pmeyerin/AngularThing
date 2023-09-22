import {ForumPost} from "./forum-post";

export interface ForumTopic {
  id: Number;
  topicTitle: string;
  postList: ForumPost[];
}
