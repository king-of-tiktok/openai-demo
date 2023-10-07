// copy pasted from https://sdk.vercel.ai/docs/guides/frameworks/nextjs-app

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  // Extract the `messages` from the body of the request
  const data = await req.json();

  // uncomment to view request body
  // console.log(data);

  const lastMessage = data.messages.at(-1).content;
  const messages = [
    {
      role: "system",
      content: "Your function is to be a helpful assistant to programmers",
    },
    {
      role: "system",
      content:
        "Translate the following code to c++, only provide the code with no markdown and no other text",
    },
    { role: "user", content: lastMessage ?? "" },
  ];

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
