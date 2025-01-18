import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CommunityWidget from '../app/components/CommunityWidget'

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

// Mock the useDataRefresh hook
jest.mock('../hooks/useDataRefresh', () => ({
  useDataRefresh: jest.fn(() => ({
    data: [
      {
        id: 1,
        author: "Jane Doe",
        avatar: "wheat",
        topic: "Pest Control",
        content: "Has anyone tried neem oil for pest control?",
        timestamp: "2 hours ago",
        replies: [
          { id: 1, author: "John Smith", content: "Yes, it works great!", timestamp: "1 hour ago" },
        ]
      },
    ],
    lastRefreshed: new Date(),
    isLoading: false,
    error: null,
  })),
}))

describe('CommunityWidget', () => {
  it('renders community highlights', () => {
    render(<CommunityWidget />)
    expect(screen.getByText('Community Highlights')).toBeInTheDocument()
    expect(screen.getByText('Pest Control')).toBeInTheDocument()
    expect(screen.getByText('Has anyone tried neem oil for pest control?')).toBeInTheDocument()
  })

  it('displays replies when accordion is expanded', async () => {
    render(<CommunityWidget />)
    const accordionTrigger = screen.getByText('1 Replies')
    fireEvent.click(accordionTrigger)

    await waitFor(() => {
      expect(screen.getByText('Yes, it works great!')).toBeInTheDocument()
    })
  })

  it('shows last updated time', () => {
    render(<CommunityWidget />)
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument()
  })
})

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CommunityPage from '../app/community/page'
import { act } from 'react-dom/test-utils'

// Mock the next/link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock the useDataRefresh hook
jest.mock('../hooks/useDataRefresh', () => ({
  useDataRefresh: jest.fn(() => ({
    data: [
      {
        id: 1,
        author: 'Jane Doe',
        avatar: 'wheat',
        topic: 'Pest Control',
        content: 'Has anyone tried neem oil for pest control?',
        timestamp: '2 hours ago',
        replies: [
          { id: 1, author: 'John Smith', content: 'Yes, it works great!', timestamp: '1 hour ago' },
        ],
      },
    ],
    lastRefreshed: new Date(),
    isLoading: false,
    error: null,
  })),
}))


describe('CommunityPage', () => {
  it('renders community highlights', () => {
    render(<CommunityPage />)
    expect(screen.getByText('Community Highlights')).toBeInTheDocument()
  })

  it('shows posts', () => {
    render(<CommunityPage />)
    expect(screen.getByText('Pest Control')).toBeInTheDocument()
  })

  it('allows adding comments to posts', async () => {
    render(<CommunityPage />)
    await waitFor(() => {
      expect(screen.getByText('Pest Control')).toBeInTheDocument()
    })

    const commentInputs = screen.getAllByPlaceholderText('Add a comment...')
    const commentButtons = screen.getAllByText('Comment')

    fireEvent.change(commentInputs[0], { target: { value: 'Great post!' } })
    fireEvent.click(commentButtons[0])

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

    const commentButtons = screen.getAllByText('Comment')
    fireEvent.click(commentButtons[0])

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Error",
      description: "Comment cannot be empty",
      variant: "destructive",
    }))
  })
})

