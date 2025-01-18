import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { kv } from '@vercel/kv'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

const CACHE_TTL = 24 * 60 * 60 // 24 hours in seconds

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1].content

  // Check cache
  const cachedResponse = await kv.get(`ai_response:${lastMessage}`)
  if (cachedResponse) {
    return new Response(cachedResponse as string)
  }

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a knowledgeable farming assistant, specializing in agricultural practices relevant to Uganda. Provide concise, practical advice on farming, crop management, pest control, soil health, and weather impacts. If asked about non-farming topics, politely redirect the conversation to agriculture. After each response, suggest 2-3 related topics for further learning.'
      },
      ...messages
    ]
  })

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      // Cache the response
      await kv.set(`ai_response:${lastMessage}`, completion, { ex: CACHE_TTL })
    },
  })

  return new StreamingTextResponse(stream)
}

