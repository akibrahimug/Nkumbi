"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Post } from "@/types";
import { PostItem } from "../components/PostItem";
import { NewDiscussionForm } from "../components/NewDiscussionForm";

async function fetchAllPosts(): Promise<Post[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      author: "Jane Doe",
      avatar: "wheat",
      topic: "Pest Control",
      content:
        "Has anyone tried neem oil for pest control? I've heard it's effective and eco-friendly.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: 1,
          author: "John Smith",
          content: "Yes, I've used neem oil and it works great!",
          timestamp: "1 hour ago",
          likes: 3,
          dislikes: 0,
          userVote: "none",
        },
        {
          id: 2,
          author: "Alice Johnson",
          content:
            "It's good, but be careful not to apply it during the hot part of the day.",
          timestamp: "30 minutes ago",
          likes: 1,
          dislikes: 0,
          userVote: "none",
        },
      ],
      likes: 5,
      dislikes: 0,
      userVote: "none",
    },
  ];
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState("You");

  useEffect(() => {
    fetchAllPosts().then((fetchedPosts) => {
      setPosts(fetchedPosts);
      setIsLoading(false);
    });
  }, []);

  const handleNewComment = (
    postId: number,
    comment: string,
    parentId?: number
  ) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (parentId) {
          // This is a reply to a comment
          const updatedReplies = post.replies.map((reply) => {
            if (reply.id === parentId) {
              return {
                ...reply,
                replies: [
                  ...(reply.replies || []),
                  {
                    id: Date.now(),
                    author: currentUser,
                    content: comment,
                    timestamp: "Just now",
                    likes: 0,
                    dislikes: 0,
                    userVote: "none",
                  },
                ],
              };
            }
            return reply;
          });
          return { ...post, replies: updatedReplies };
        } else {
          // This is a new top-level comment
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                author: currentUser,
                content: comment,
                timestamp: "Just now",
                likes: 0,
                dislikes: 0,
                userVote: "none",
              },
            ],
          };
        }
      }
      return post;
    });

    setPosts(updatedPosts);
    toast({
      title: "Success",
      description: "Your comment has been added",
    });
  };

  const handleVote = (
    postId: number,
    replyId: number | null,
    voteType: "like" | "dislike" | "none"
  ) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (replyId === null) {
          // Voting on the main post
          let newLikes = post.likes;
          let newDislikes = post.dislikes;
          let newUserVote = voteType;

          if (post.userVote === "like" && voteType !== "like") {
            newLikes--;
          } else if (post.userVote === "dislike" && voteType !== "dislike") {
            newDislikes--;
          }

          if (voteType === "like" && post.userVote !== "like") {
            newLikes++;
          } else if (voteType === "dislike" && post.userVote !== "dislike") {
            newDislikes++;
          }

          return {
            ...post,
            likes: newLikes,
            dislikes: newDislikes,
            userVote: newUserVote,
          };
        } else {
          // Voting on a reply
          const updatedReplies = post.replies.map((reply) => {
            if (reply.id === replyId) {
              let newLikes = reply.likes;
              let newDislikes = reply.dislikes;
              let newUserVote = voteType;

              if (reply.userVote === "like" && voteType !== "like") {
                newLikes--;
              } else if (
                reply.userVote === "dislike" &&
                voteType !== "dislike"
              ) {
                newDislikes--;
              }

              if (voteType === "like" && reply.userVote !== "like") {
                newLikes++;
              } else if (
                voteType === "dislike" &&
                reply.userVote !== "dislike"
              ) {
                newDislikes++;
              }

              return {
                ...reply,
                likes: newLikes,
                dislikes: newDislikes,
                userVote: newUserVote,
              };
            }
            return reply;
          });
          return { ...post, replies: updatedReplies };
        }
      }
      return post;
    });

    setPosts(updatedPosts);
    toast({
      title: "Vote Recorded",
      description: `Your vote has been ${
        voteType === "none" ? "removed" : "recorded"
      }`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F1DE] text-[#5E503F]">
      <header className="bg-[#2C5F2D] text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Community Forum</h1>
      </header>
      <main className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" /> Recent Discussions
          </h2>
          {isLoading ? (
            <p>Loading discussions...</p>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onNewComment={handleNewComment}
                  onVote={handleVote}
                  currentUser={currentUser}
                />
              ))}
            </ul>
          )}
        </div>
        <NewDiscussionForm />
      </main>
    </div>
  );
}
