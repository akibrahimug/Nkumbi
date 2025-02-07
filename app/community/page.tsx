"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { useToast } from "@/app/components/ui/use-toast";
import { Post } from "@/types";
import { PostItem } from "../components/PostItem";
import { NewDiscussionForm } from "../components/NewDiscussionForm";
import Loading from "./loading";
import { useSession } from "next-auth/react";

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      });
  }, [toast]);

  const handleNewComment = async (
    postId: string,
    comment: string,
    parentId?: string
  ) => {
    try {
      const response = await fetch("/api/posts/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: comment,
          parentCommentId: parentId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // Refresh posts after adding comment
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);

      toast({
        title: "Success",
        description: "Your comment has been added",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleVote = async (
    postId: string,
    commentId: string | null,
    voteType: "like" | "dislike" | "none"
  ) => {
    try {
      const response = await fetch("/api/posts/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          commentId,
          voteType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to record vote");
      }

      // Refresh posts after voting
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);

      toast({
        title: "Vote Recorded",
        description: `Your vote has been ${
          voteType === "none" ? "removed" : "recorded"
        }`,
      });
    } catch (error) {
      console.error("Error recording vote:", error);
      toast({
        title: "Error",
        description: "Failed to record vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
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
                    currentUser={session?.user?.email || ""}
                  />
                ))}
              </ul>
            )}
          </div>
          <NewDiscussionForm onSuccess={() => fetchPosts().then(setPosts)} />
        </main>
      </div>
    </Suspense>
  );
}
