import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { message, attachments, conversationHistory } = await request.json();

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build the conversation context
    let prompt = `You are Note Ginie, an AI assistant specialized in helping students with their studies, note-taking, and academic work. 

Your role is to:
- Help students understand complex topics
- Assist with note organization and summarization
- Provide study tips and strategies
- Help with academic writing and research
- Answer questions about various subjects
- Analyze uploaded documents and provide insights

Be helpful, encouraging, and educational in your responses. Keep responses concise but informative.

User message: ${message}`;

    // Add conversation history for context
    if (conversationHistory && conversationHistory.length > 0) {
      prompt += '\n\nConversation history:\n';
      conversationHistory.forEach((msg: any) => {
        prompt += `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
    }

    // Add attachment information if present
    if (attachments && attachments.length > 0) {
      prompt += '\n\nAttachments provided:\n';
      attachments.forEach((attachment: any) => {
        prompt += `- ${attachment.name} (${attachment.type})\n`;
      });
      prompt += '\nPlease consider the uploaded files in your response.';
    }

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      success: true 
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 