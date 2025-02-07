export interface Reply {
  id: string;
  author: string;
  username?: string;
  location?: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userVote: "like" | "dislike" | "none";
  isAuthor: boolean;
  replies?: Reply[];
}

export interface Post {
  id: string;
  author: string;
  username?: string;
  location?: string;
  content: string;
  media?: string;
  timestamp: string;
  replies: Reply[];
  likes: number;
  dislikes: number;
  userVote: "like" | "dislike" | "none";
  isAuthor: boolean;
}
