import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'education';
  const subject = searchParams.get('subject') || '';
  
  try {
    // Use environment variable for API key
    const apiKey = process.env.NYT_BOOKS_API_KEY;
    
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${apiKey}&title=${query}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from NYT API');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}