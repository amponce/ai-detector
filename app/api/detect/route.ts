// Import AxiosError for type checking
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';

async function postToHuggingFace(API_URL: string, payload: any, headers: any): Promise<AxiosResponse<any>> {
  try {
    const response = await axios.post(API_URL, payload, { headers });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error('API Response Error:', error.response?.data);
      // Check for specific errors like model loading and retry logic here
      if (error.response && error.response.data.error === "Model microsoft/DialoGPT-medium is currently loading") {
        await new Promise(resolve => setTimeout(resolve, 10000)); // wait for 10 seconds
        return postToHuggingFace(API_URL, payload, headers); // retry the request
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function POST(request: Request) {
  console.log("API Route hit", request.method);

  let requestData;
  try {
    requestData = await request.json();
  } catch (parseError) {
    console.error('Error parsing request data:', parseError);
    return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
  }

  const { text, model } = requestData;
  if (!text || !model) {
    console.error('Missing text or model data');
    return NextResponse.json({ message: 'Missing text or model information' }, { status: 400 });
  }

  const token = process.env.HF_API_TOKEN;
  if (!token) {
    console.error('Hugging Face API token is missing');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  const API_URL = `https://api-inference.huggingface.co/models/${model}`;
  const headers = { 'Authorization': `Bearer ${token}` };
  const payload = { inputs: text };

  try {
    const response = await postToHuggingFace(API_URL, payload, headers);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Final error after retrying:', error);
    // Ensure error is an AxiosError before trying to access .response
    if (error instanceof AxiosError) {
      return NextResponse.json({ message: 'Failed to process the request after retry' }, { status: error.response?.status || 500 });
    } else {
      return NextResponse.json({ message: 'Failed to process the request after retry' }, { status: 500 });
    }
  }
}
