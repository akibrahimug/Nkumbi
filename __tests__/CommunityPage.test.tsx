import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CommunityPage from '../app/community/page'
import { act } from 'react-dom/test-utils'

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

// Mock the useToast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Mock data
const mockPosts = [
  {
    id: 1,
    author: "Jane Doe",
    avatar: "wheat",
    topic: "Pest Control",
    content: "Has anyone tried neem oil for pest control?",
    timestamp: "2 hours ago",
    replies: [
      { id: 1, author: "John Smith", content: "Yes, it works great!", timestamp: "1 hour ago", votes: 3 },
    ],
    votes: 5
  },
  {
    id: 2,
    author: "John Smith",
    avatar: "coffee",
    topic: "Coffee Prices",
    content: "Coffee prices are on the rise!",
    timestamp: "5 hours ago",
    replies: [],
    votes: 8
  },
]

// Mock the fetchAllPosts function
jest.mock('../app/community/page', () => {
  const originalModule = jest.requireActual('../app/community/page')
  return {
    ...originalModule,
    fetchAllPosts: jest.fn(() => Promise.resolve(mockPosts)),
  }
})

describe('CommunityPage', () => {
  it('renders loading state initially', () => {
    render(<CommunityPage />)
    expect(screen.getByText('Loading discussions...')).toBeInTheDocument()
  })

  it('renders posts after loading', async () => {
    render(<CommunityPage />)
    await waitFor(() => {
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
      expect(screen.getByText('Coffee Prices')).toBeInTheDocument()
    })
  })

  it('allows voting on posts', async () => {
    render(<CommunityPage />)
    await waitFor(() => {
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
    })

    const upvoteButton = screen.getAllByText('5')[0]
    fireEvent.click(upvoteButton)

    await waitFor(() => {
      expect(screen.getByText('6')).toBeInTheDocument()
    })
  })

  it('allows adding comments', async () => {
    render(<CommunityPage />)
    await waitFor(() => {
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
    })

    const commentInput = screen.getAllByPlaceholderText('Add a comment...')[0] as HTMLInputElement
    const commentButton = screen.getAllByText('Comment')[0]

    fireEvent.change(commentInput, { target: { value: 'Great post!' } })
    fireEvent.click(commentButton)

    await waitFor(() => {
      expect(screen.getByText('Great post!')).toBeInTheDocument()
    })
  })

  it('displays error toast for empty comments', async () => {
    const mockToast = jest.fn()
    jest.spyOn(require("@/components/ui/use-toast"), 'useToast').mockImplementation(() => ({
      toast: mockToast,
    }))

    render(<CommunityPage />)
    await waitFor(() => {
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
    })

    const commentButton = screen.getAllByText('Comment')[0]
    fireEvent.click(commentButton)

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Error",
      description: "Comment cannot be empty",
      variant: "destructive",
    }))
  })
})

