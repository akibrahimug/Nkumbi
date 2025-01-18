import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AskFarmingAIWidget from '../app/components/AskFarmingAIWidget'

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

// Mock the useChat hook
jest.mock('ai/react', () => ({
  useChat: jest.fn(() => ({
    messages: [],
    input: '',
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    setInput: jest.fn(),
  })),
}))

// Mock the AutocompleteInput component
jest.mock('../app/components/AutocompleteInput', () => ({
  AutocompleteInput: jest.fn(() => <div>Mocked AutocompleteInput</div>),
}))

// Mock the RelatedTopics component
jest.mock('../app/components/RelatedTopics', () => ({
  RelatedTopics: jest.fn(() => <div>Mocked RelatedTopics</div>),
}))

// Mock the VoiceInput component
jest.mock('../app/components/VoiceInput', () => ({
  VoiceInput: jest.fn(() => <div>Mocked VoiceInput</div>),
}))

describe('AskFarmingAIWidget', () => {
  it('renders the widget title', () => {
    render(<AskFarmingAIWidget />)
    expect(screen.getByText('Ask the Farming AI')).toBeInTheDocument()
  })

  it('renders the input field and submit button', () => {
    render(<AskFarmingAIWidget />)
    expect(screen.getByPlaceholderText('Or type your question here...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument() // Submit button (icon only)
  })

  it('expands when a question is submitted', async () => {
    const { useChat } = require('ai/react')
    useChat.mockImplementation(() => ({
      messages: [{ id: 1, content: 'Hello, how can I help you?', role: 'assistant' }],
      input: '',
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
      isLoading: false,
      setInput: jest.fn(),
    }))

    render(<AskFarmingAIWidget />)
    const input = screen.getByPlaceholderText('Or type your question here...')
    const submitButton = screen.getByRole('button', { name: '' })

    fireEvent.change(input, { target: { value: 'How do I grow tomatoes?' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Hello, how can I help you?')).toBeInTheDocument()
    })
  })

  it('shows feedback options after receiving a response', async () => {
    const { useChat } = require('ai/react')
    useChat.mockImplementation(() => ({
      messages: [{ id: 1, content: 'Here\'s how to grow tomatoes...', role: 'assistant' }],
      input: '',
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
      isLoading: false,
      setInput: jest.fn(),
    }))

    render(<AskFarmingAIWidget />)

    await waitFor(() => {
      expect(screen.getByText('Was this response helpful?')).toBeInTheDocument()
      expect(screen.getByText('Yes')).toBeInTheDocument()
      expect(screen.getByText('No')).toBeInTheDocument()
    })
  })
})

