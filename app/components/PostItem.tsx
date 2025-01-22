"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentItem } from "./CommentItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Post } from "@/types";

interface PostItemProps {
  post: Post;
  onNewComment: (postId: number, comment: string, parentId?: number) => void;
  onVote: (
    postId: number,
    replyId: number | null,
    voteType: "like" | "dislike" | "none"
  ) => void;
  currentUser: string;
}

export function PostItem({
  post,
  onNewComment,
  onVote,
  currentUser,
}: PostItemProps) {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    onNewComment(post.id, newComment);
    setNewComment("");
  };

  const handleVote = (isLike: boolean) => {
    const voteType = isLike ? "like" : "dislike";
    if (post.userVote === voteType) {
      // If the user clicks the same vote type, remove their vote
      onVote(post.id, null, "none");
    } else {
      // Otherwise, set their vote to the new type
      onVote(post.id, null, voteType);
    }
  };

  return (
    <li className="pb-4">
      <div className="flex items-center mb-2">
        <span className="font-semibold">{post.author}</span>
        <span className="text-xs text-gray-500 ml-auto">{post.timestamp}</span>
      </div>
      <h3 className="font-semibold text-lg mb-2">{post.topic}</h3>
      <p className="text-sm mb-2">{post.content}</p>
      <div className="flex items-center space-x-4 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote(true)}
          className={`transition-colors ${
            post.userVote === "like"
              ? "text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
          disabled={post.author === currentUser}
        >
          <ThumbsUp className="w-4 h-4 mr-2" /> {post.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote(false)}
          className={`transition-colors ${
            post.userVote === "dislike"
              ? "text-red-600"
              : "text-gray-600 hover:text-red-600"
          }`}
          disabled={post.author === currentUser}
        >
          <ThumbsDown className="w-4 h-4 mr-2" /> {post.dislikes}
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="comments">
          <AccordionTrigger className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            {post.replies.length} Comments
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {post.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onVote={(voteType) => onVote(post.id, reply.id, voteType)}
                  onReply={(content) =>
                    onNewComment(post.id, content, reply.id)
                  }
                  currentUser={currentUser}
                />
              ))}
            </div>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button
                onClick={handleCommentSubmit}
                className="bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]"
              >
                Add Comment
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
