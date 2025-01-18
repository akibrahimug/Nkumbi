'use client'

import { useDataRefresh } from '@/hooks/useDataRefresh'
import Link from 'next/link'
import { MessageCircle, Users, Wheat, Coffee, CropIcon as Corn, ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react'

type Reply = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

type Post = {
  id: number;
  author: string;
  avatar: string;
  topic: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

const cropIcons = {
  wheat: <Wheat className="w-6 h-6" />,
  coffee: <Coffee className="w-6 h-6" />,
  corn: <Corn className="w-6 h-6" />,
}

async function fetchRecentPosts(): Promise<Post[]> {
  // In a real application, this would be an API call
  // For demonstration, we'll simulate an API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: 1,
      author: "Jane Doe",
      avatar: "wheat",
      topic: "Pest Control",
      content: "Has anyone tried neem oil for pest control? I've heard it's effective and eco-friendly.",
      timestamp: "2 hours ago",
      replies: [
        { id: 1, author: "John Smith", content: "Yes, I've used neem oil and it works great!", timestamp: "1 hour ago" },
        { id: 2, author: "Alice Johnson", content: "It's good, but be careful not to apply it during the hot part of the day.", timestamp: "30 minutes ago" },
      ]
    },
    {
      id: 2,
      author: "John Smith",
      avatar: "coffee",
      topic: "Coffee Prices",
      content: "Coffee prices are on the rise! Great news for us coffee farmers.",
      timestamp: "5 hours ago",
      replies: [
        { id: 3, author: "Emma Brown", content: "That's excellent! Do you know how long this trend is expected to last?", timestamp: "4 hours ago" },
      ]
    },
    {
      id: 3,
      author: "Alice Johnson",
      avatar: "corn",
      topic: "Irrigation Tips",
      content: "I've implemented a drip irrigation system and it's saving so much water!",
      timestamp: "1 day ago",
      replies: []
    }
  ]
}

export default function CommunityWidget() {
  const { data: recentPosts, lastRefreshed, isLoading, error } = useDataRefresh<Post[]>(
    fetchRecentPosts,
    []
  )

  return (
    <Link 
      href="/community"
      className="block bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md active:bg-gray-50"
    >
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Users className="mr-2 text-[#2C5F2D] w-5 h-5 sm:w-6 sm:h-6" /> Community Highlights
      </h2>
      {error ? (
        <p className="text-red-500">Error loading community posts. Please try again.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="border-b pb-2 p-2 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="mr-2 text-[#2C5F2D]">
                    {cropIcons[post.avatar as keyof typeof cropIcons]}
                  </div>
                  <span className="font-semibold text-sm sm:text-base">{post.author}</span>
                  <span className="text-xs text-gray-500 ml-auto">{post.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm mb-1"><strong>{post.topic}:</strong> {post.content}</p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`replies-${post.id}`}>
                    <AccordionTrigger className="text-xs sm:text-sm text-[#2C5F2D]">
                      {post.replies.length} Replies
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {post.replies.map((reply) => (
                          <li key={reply.id} className="text-xs sm:text-sm">
                            <span className="font-semibold">{reply.author}:</span> {reply.content}
                            <span className="text-xs text-gray-500 ml-2">{reply.timestamp}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <span className="text-xs text-gray-500">
              {isLoading ? 'Updating...' : `Last updated: ${lastRefreshed.toLocaleTimeString()}`}
            </span>
          </div>
        </>
      )}
    </Link>
  )
}

