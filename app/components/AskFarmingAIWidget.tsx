'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Wheat, Send, Save, Share2, History, ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from 'ai/react'
import { AutocompleteInput } from './AutocompleteInput'
import { RelatedTopics } from './RelatedTopics'
import { VoiceInput } from './VoiceInput'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import { useInView } from 'react-intersection-observer'

const CACHE_KEY = 'farmingAICache'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export default function AskFarmingAIWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [savedQueries, setSavedQueries] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [relatedTopics, setRelatedTopics] = useState<{ title: string; url: string; }[]>([])
  const [cache, setCache] = useState<Record<string, { response: string; timestamp: number }>>({})
  const [isListening, setIsListening] = useState(false)
  const { toast } = useToast()
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  })

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/farming-ai',
    onFinish: (message) => {
      setShowFeedback(true)
      const topics = generateRelatedTopics(message.content)
      setRelatedTopics(topics)
      updateCache(input, message.content)
    },
  })

  useEffect(() => {
    if (inView) {
      const saved = localStorage.getItem('savedQueries')
      if (saved) {
        setSavedQueries(JSON.parse(saved))
      }

      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        setCache(JSON.parse(cachedData))
      }
    }
  }, [inView])

  const updateCache = useCallback((query: string, response: string) => {
    setCache(prevCache => {
      const newCache = { ...prevCache, [query]: { response, timestamp: Date.now() } }
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCache))
      return newCache
    })
  }, [])

  const getCachedResponse = useCallback((query: string) => {
    const cachedItem = cache[query]
    if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRY) {
      return cachedItem.response
    }
    return null
  }, [cache])

  const isAgricultureRelated = useMemo(() => {
    const agricultureKeywords = [
      'farming', 'crop', 'harvest', 'soil', 'plant', 'seed', 'fertilizer',
      'pesticide', 'irrigation', 'weather', 'livestock', 'agriculture'
    ]
    return (question: string) => agricultureKeywords.some(keyword => question.toLowerCase().includes(keyword))
  }, [])

  const handleAskQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isAgricultureRelated(input)) {
      toast({
        title: "Non-agriculture Question",
        description: "Please ask a question related to farming or agriculture.",
        variant: "destructive",
      })
      return
    }

    const cachedResponse = getCachedResponse(input)
    if (cachedResponse) {
      setInput('')
      setIsExpanded(true)
      setShowFeedback(true)
      const topics = generateRelatedTopics(cachedResponse)
      setRelatedTopics(topics)
      toast({
        title: "Cached Response",
        description: "This answer was retrieved from cache.",
      })
      return
    }

    handleSubmit(e)
    setIsExpanded(true)
    setShowFeedback(false)
  }

  const saveQuery = useCallback(() => {
    if (input) {
      setSavedQueries(prevQueries => {
        const updatedQueries = prevQueries ? [...prevQueries, input] : [input]
        localStorage.setItem('savedQueries', JSON.stringify(updatedQueries))
        return updatedQueries
      })
      toast({
        title: "Query Saved",
        description: "Your query has been saved for future reference.",
      })
    }
  }, [input, toast])

  const shareQuery = useCallback(() => {
    const shareText = `Check out this farming question: ${input}`
    if (navigator.share) {
      navigator.share({
        title: 'Farming Question',
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      toast({
        title: "Copied to Clipboard",
        description: "The query has been copied to your clipboard.",
      })
    }
  }, [input, toast])

  const handleFeedback = useCallback((isPositive: boolean) => {
    // Here you would typically send this feedback to your server
    console.log(`Feedback for last response: ${isPositive ? 'positive' : 'negative'}`)
    setShowFeedback(false)
    toast({
      title: "Feedback Received",
      description: "Thank you for your feedback!",
    })
  }, [toast])

  const escalateQuery = useCallback(() => {
    // Here you would typically implement the logic to escalate the query
    toast({
      title: "Query Escalated",
      description: "Your query has been escalated to our expert team. We'll get back to you soon!",
    })
  }, [toast])

  const generateRelatedTopics = useCallback((content: string) => {
    // This is a simplified example. In a real application, you might use
    // more sophisticated NLP techniques or an API call to generate related topics.
    const topics = [
      { title: "Soil Health Management", url: "/community/soil-health" },
      { title: "Sustainable Farming Practices", url: "/resources/sustainable-farming" },
      { title: "Crop Disease Prevention", url: "/community/crop-diseases" },
    ]
    return topics
  }, [])

  const handleVoiceInput = useCallback((transcript: string) => {
    setInput(transcript)
  }, [setInput])

  return (
    <div ref={ref} className="bg-white p-4 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center text-[#5E503F]">
        <Wheat className="mr-2 text-[#2C5F2D] w-5 h-5 sm:w-6 sm:h-6" /> Ask the Farming AI
      </h2>
      <form onSubmit={handleAskQuestion} className="space-y-4">
        <AutocompleteInput onSelect={setInput} />
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Or type your question here..."
            value={input}
            onChange={handleInputChange}
            className="flex-grow mr-2 border-[#2C5F2D] focus:ring-[#2C5F2D]"
          />
          <VoiceInput
            onTranscript={handleVoiceInput}
            isListening={isListening}
            setIsListening={setIsListening}
          />
          <Button type="submit" className="ml-2 bg-[#2C5F2D] text-white hover:bg-[#1F4F1F]">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 border-t border-[#2C5F2D] pt-4"
          >
            <div className="space-y-4">
              {messages && messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3/4 p-2 rounded-lg ${m.role === 'user' ? 'bg-[#2C5F2D] text-white' : 'bg-[#F4F1DE] text-[#5E503F]'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-[#F4F1DE] text-[#5E503F] p-2 rounded-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Thinking...
                  </motion.div>
                </motion.div>
              )}
            </div>
            {showFeedback && (
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="mr-2 text-[#5E503F]">Was this response helpful?</span>
                  <Button onClick={() => handleFeedback(true)} variant="outline" size="sm" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white">
                    <ThumbsUp className="w-4 h-4 mr-1" /> Yes
                  </Button>
                  <Button onClick={() => handleFeedback(false)} variant="outline" size="sm" className="ml-2 border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white">
                    <ThumbsDown className="w-4 h-4 mr-1" /> No
                  </Button>
                </div>
                <Button onClick={escalateQuery} variant="outline" size="sm" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white">
                  <HelpCircle className="w-4 h-4 mr-1" /> Get Expert Help
                </Button>
              </div>
            )}
            {relatedTopics.length > 0 && <RelatedTopics topics={relatedTopics} />}
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={saveQuery} variant="outline" size="sm" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white">
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button onClick={shareQuery} variant="outline" size="sm" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
              <Button onClick={() => setIsExpanded(false)} variant="outline" size="sm" className="border-[#2C5F2D] text-[#2C5F2D] hover:bg-[#2C5F2D] hover:text-white">
                <History className="w-4 h-4 mr-1" /> Past Queries
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isExpanded && savedQueries && savedQueries.length > 0 && (
        <div className="mt-4 border-t border-[#2C5F2D] pt-4">
          <h3 className="text-md font-semibold mb-2 text-[#5E503F]">Past Queries</h3>
          <ul className="space-y-2">
            {savedQueries.map((query, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm text-[#5E503F]">{query}</span>
                <Button onClick={() => setInput(query)} variant="ghost" size="sm" className="text-[#2C5F2D] hover:bg-[#F4F1DE]">
                  Use
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4 text-sm text-[#5E503F]">
        <Link href="/community" className="text-[#2C5F2D] hover:underline">
          Visit our community forum for more discussions
        </Link>
      </div>
    </div>
  )
}

