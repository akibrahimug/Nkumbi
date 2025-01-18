'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, MessageCircle, Wheat, Coffee, CropIcon as Corn, Send, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

type Reply = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  votes: number;
}

type Post = {
  id: number;
  author: string;
  avatar: string;
  topic: string;
  content: string;
  timestamp: string;
  replies: Reply[];
  votes: number;
}

const cropIcons = {
  wheat: <Wheat className="w-6 h-6" />,
  coffee: <Coffee className="w-6 h-6" />,
  corn: <Corn className="w-6 h-6" />,
}

async function fetchAllPosts(): Promise<Post[]> {
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
        { id: 1, author: "John Smith", content: "Yes, I've used neem oil and it works great!", timestamp: "1 hour ago", votes: 3 },
        { id: 2, author: "Alice Johnson", content: "It's good, but be careful not to apply it during the hot part of the day.", timestamp: "30 minutes ago", votes: 1 },
      ],
      votes: 5
    },
    {
      id: 2,
      author: "John Smith",
      avatar: "coffee",
      topic: "Coffee Prices",
      content: "Coffee prices are on the rise! Great news for us coffee farmers.",
      timestamp: "5 hours ago",
      replies: [
        { id: 3, author: "Emma Brown", content: "That's excellent! Do you know how long this trend is expected to last?", timestamp: "4 hours ago", votes: 2 },
      ],
      votes: 8
    },
    {
      id: 3,
      author: "Alice Johnson",
      avatar: "corn",
      topic: "Irrigation Tips",
      content: "I've implemented a drip irrigation system and it's saving so much water!",
      timestamp: "1 day ago",
      replies: [],
      votes: 10
    },
    {
      id: 4,
      author: "Bob Wilson",
      avatar: "wheat",
      topic: "Crop Rotation",
      content: "What's your crop rotation strategy? I'm looking to optimize mine for next season.",
      timestamp: "2 days ago",
      replies: [],
      votes: 3
    },
    {
      id: 5,
      author: "Emma Brown",
      avatar: "coffee",
      topic: "Organic Certification",
      content: "Has anyone gone through the organic certification process? Any tips?",
      timestamp: "3 days ago",
      replies: [],
      votes: 6
    }
  ]
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newComments, setNewComments] = useState<{[key: number]: string}>({})
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAllPosts().then(fetchedPosts => {
      setPosts(fetchedPosts)
      setIsLoading(false)
    })
  }, [])

  const handleCommentChange = (postId: number, comment: string) => {
    setNewComments(prev => ({ ...prev, [postId]: comment }))
  }

  const handleCommentSubmit = (postId: number) => {
    if (!newComments[postId]?.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      })
      return
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: Date.now(),
              author: "You", // In a real app, this would be the logged-in user's name
              content: newComments[postId],
              timestamp: "Just now",
              votes: 0
            }
          ]
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setNewComments(prev => ({ ...prev, [postId]: '' }))
    toast({
      title: "Success",
      description: "Your comment has been added",
    })
  }

  const handleVote = (postId: number, replyId: number | null, isUpvote: boolean) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        if (replyId === null) {
          // Voting on the main post
          return { ...post, votes: post.votes + (isUpvote ? 1 : -1) }
        } else {
          // Voting on a reply
          const updatedReplies = post.replies.map(reply => 
            reply.id === replyId ? { ...reply, votes: reply.votes + (isUpvote ? 1 : -1) } : reply
          )
          return { ...post, replies: updatedReplies }
        }
      }
      return post
    })

    setPosts(updatedPosts)
    toast({
      title: "Vote Recorded",
      description: `Your ${isUpvote ? 'upvote' : 'downvote'} has been recorded`,
    })
  }

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
                <li key={post.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-[#2C5F2D]">
                      {cropIcons[post.avatar as keyof typeof cropIcons]}
                    </div>
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-xs text-gray-500 ml-auto">{post.timestamp}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{post.topic}</h3>
                  <p className="text-sm mb-2">{post.content}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleVote(post.id, null, true)}
                      className="text-green-600"
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" /> {post.votes}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleVote(post.id, null, false)}
                      className="text-red-600"
                    >
                      <ThumbsDown className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                  <div className="ml-6 space-y-4">
                    {post.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm">{reply.author}</span>
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm mb-2">{reply.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleVote(post.id, reply.id, true)}
                            className="text-green-600"
                          >
                            <ThumbsUp className="w-4 h-4 mr-2" /> {reply.votes}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleVote(post.id, reply.id, false)}
                            className="text-red-600"
                          >
                            <ThumbsDown className="w-4 h-4 mr-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center">
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComments[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      className="flex-grow mr-2"
                    />
                    <Button 
                      onClick={() => handleCommentSubmit(post.id)}
                      className="bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]"
                    >
                      <Send className="w-4 h-4 mr-2" /> Comment
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
              <Input type="text" id="topic" name="topic" className="mt-1 block w-full" />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <Textarea id="content" name="content" rows={4} className="mt-1 block w-full" />
            </div>
            <Button type="submit" className="bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]">
              <MessageCircle className="w-4 h-4 mr-2" /> Post Discussion
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

