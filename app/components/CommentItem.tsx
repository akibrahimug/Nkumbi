"use client";

import { useState } from "react";
import {
  Edit,
  Save,
  X,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { Reply } from "@/types";

interface CommentItemProps {
  comment: Reply;
  onVote: (voteType: "like" | "dislike") => void;
  onReply: (content: string) => void;
  currentUser: string;
}

export function CommentItem({
  comment,
  onVote,
  onReply,
  currentUser,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const isAuthor = comment.author === currentUser;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, you would update the comment on the server here
    comment.content = editedContent;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-sm">{comment.author}</span>
        <span className="text-xs text-gray-500">{comment.timestamp}</span>
      </div>
      {isEditing ? (
        <div className="mb-2">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end space-x-2">
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm mb-2">{comment.content}</p>
      )}
      <div className="flex items-center space-x-4">
        {!isAuthor && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote("like")}
              className={`transition-colors ${
                comment.userVote === "like"
                  ? "text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              <ThumbsUp className="w-4 h-4 mr-2" /> {comment.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote("dislike")}
              className={`transition-colors ${
                comment.userVote === "dislike"
                  ? "text-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              <ThumbsDown className="w-4 h-4 mr-2" /> {comment.dislikes}
            </Button>
          </>
        )}
        {isAuthor && !isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-blue-600"
          >
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
        )}
        {!isAuthor && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsReplying(!isReplying)}
            className="text-gray-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> Reply
          </Button>
        )}
      </div>
      {isReplying && (
        <div className="mt-2">
          <Input
            type="text"
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-2"
          />
          <Button size="sm" onClick={handleReply}>
            Reply
          </Button>
        </div>
      )}
    </div>
  );
}
