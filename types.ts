export interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | "none";
  replies?: Reply[];
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  topic: string;
  content: string;
  timestamp: string;
  replies: Reply[];
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | "none";
}
