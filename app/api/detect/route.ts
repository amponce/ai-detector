// app/api/detect/route.ts
import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function POST(request: Request) {
  console.log("API Route hit", request.method);

  const { text } = await request.json();
  const API_URL = 'https://api-inference.huggingface.co/models/openai-community/roberta-base-openai-detector';
  const token = process.env.HF_API_TOKEN;

  try {
    const response = await axios.post(API_URL, { inputs: text }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error calling the Hugging Face API:', error);
    if (error instanceof AxiosError) {
      return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}