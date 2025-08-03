# NoteGenie - AI-Powered Study Assistant

NoteGenie is an intelligent study assistant that helps students organize notes, search books, and interact with AI for academic support.

## Features

- **Book Search & Library Management** - Search and organize your academic books
- **Note Upload & Organization** - Upload and manage your study materials
- **AI-Powered Help** - Get assistance from Gemini AI for your studies
- **Community Notes** - Share and discover notes from other students
- **Modern UI** - Beautiful, responsive interface with dark theme

## Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Gemini API Key** (free from Google)

### Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp env.example .env.local
```

3. **Get your free Gemini API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## AI Features

The **Ginie Help** page now features real AI integration with Google's Gemini:

- 💬 **Real-time Chat** - Ask questions and get instant responses
- 📄 **Document Analysis** - Upload files for AI analysis
- 🧠 **Contextual Responses** - AI remembers conversation history
- 🎯 **Study-Focused** - Specialized in academic assistance

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
