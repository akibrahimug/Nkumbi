"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Reply } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

interface CommentItemProps {
  comment: Reply;
  onVote: (voteType: "like" | "dislike" | "none") => void;
  onReply: (content: string) => void;
  currentUser: string;
}

export function CommentItem({
  comment,
  onVote,
  onReply,
  currentUser,
}: CommentItemProps) {
  const [replyText, setReplyText] = useState("");

  const handleVote = (isLike: boolean) => {
    const voteType = isLike ? "like" : "dislike";
    if (comment.userVote === voteType) {
      onVote("none");
    } else {
      onVote(voteType);
    }
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReply(replyText);
    setReplyText("");
  };

  return (
    <div className="pl-4 border-l-2 border-gray-200">
      <div className="flex items-center mb-2">
        <div>
          <span className="font-semibold">{comment.author}</span>
          {comment.username && (
            <span className="text-gray-500 text-sm ml-2">
              @{comment.username}
            </span>
          )}
          {comment.location && (
            <div className="text-xs text-gray-500 flex items-center mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {comment.location}
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500 ml-auto">
          {new Date(comment.timestamp).toLocaleString()}
        </span>
      </div>
      <p className="text-sm mb-2">{comment.content}</p>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote(true)}
          className={`transition-colors ${
            comment.userVote === "like"
              ? "text-green-600"
              : "text-gray-600 hover:text-green-600"
          }`}
          disabled={comment.isAuthor}
        >
          <ThumbsUp className="w-4 h-4 mr-2" /> {comment.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote(false)}
          className={`transition-colors ${
            comment.userVote === "dislike"
              ? "text-red-600"
              : "text-gray-600 hover:text-red-600"
          }`}
          disabled={comment.isAuthor}
        >
          <ThumbsDown className="w-4 h-4 mr-2" /> {comment.dislikes}
        </Button>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="replies">
            <AccordionTrigger className="text-sm text-gray-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              {comment.replies.length} Replies
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-2">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onVote={onVote}
                    onReply={onReply}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <div className="mt-4">
        <Input
          type="text"
          placeholder="Reply to this comment..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="mb-2"
        />
        <Button
          onClick={handleReplySubmit}
          size="sm"
          className="bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]"
        >
          Reply
        </Button>
      </div>
    </div>
  );
}
