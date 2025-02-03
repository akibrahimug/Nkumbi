"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export function NewDiscussionForm() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the new discussion to the server here
    console.log("New discussion:", { topic, content });
    setTopic("");
    setContent("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700"
          >
            Topic
          </label>
          <Input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full"
          />
        </div>
        <Button
          type="submit"
          className="bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]"
        >
          <MessageCircle className="w-4 h-4 mr-2" /> Post Discussion
        </Button>
      </form>
    </div>
  );
}
