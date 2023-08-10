import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
export const runtime = 'edge'
 
const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
 
const openai = new OpenAIApi(apiConfig)
 
export async function POST(req) {
  const { question, prompt } = await req.json()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Tambahkan pertanyaan ini ke konteks: ${question} 
Dari konteks sebelumnya, buatlah alternatif jawaban dari kalimat ${prompt}. 
Jawablah dalam bentuk array ["kalimat 1", "kalimat 2", ....] yang isinya 4 alternatif kalimat. Jawab hanya dalam array
        `
      }
    ],
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })
 
  const stream = OpenAIStream(response)
 
  return new StreamingTextResponse(stream)
}