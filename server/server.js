import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailjs from '@emailjs/browser';

// Load environment variables from .env file
dotenv.config({ path: '.env.server' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow production domain
    if (origin === process.env.CLIENT_URL) {
      return callback(null, true);
    }

    // Allow any localhost port for development
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Validate environment variables on startup
const requiredEnvVars = [
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
  'OPENAI_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please create a .env.server file with all required variables');
  process.exit(1);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Send email via EmailJS (for Contact form)
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Prepare email parameters
    const emailParams = {
      name: name,
      time: new Date().toLocaleString(),
      message: `Email: ${email}\n${subject ? `Subject: ${subject}\n` : ''}Message: ${message}`
    };

    // Send email using EmailJS
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      emailParams,
      process.env.EMAILJS_PUBLIC_KEY
    );

    res.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
});

// Send AaronGPT conversation to Aaron via EmailJS
app.post('/api/send-conversation', async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Messages array is required and must not be empty'
      });
    }

    // Format the conversation for email
    const conversationText = messages
      .map(msg => `${msg.type === 'user' ? 'Visitor' : 'AaronGPT'}: ${msg.content}`)
      .join('\n\n');

    const timestamp = new Date().toLocaleString();

    // Email parameters
    const emailParams = {
      to_email: 'aaron.kleiman@queensu.ca',
      from_name: 'Portfolio Website Visitor',
      subject: 'New AaronGPT Conversation from Your Portfolio',
      message: `A visitor had the following conversation with AaronGPT on your portfolio website:\n\nTimestamp: ${timestamp}\n\n${conversationText}\n\n---\nSent from your portfolio website AaronGPT chatbot.`
    };

    // Send email using EmailJS
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      emailParams,
      process.env.EMAILJS_PUBLIC_KEY
    );

    res.json({
      success: true,
      message: 'Conversation sent successfully'
    });
  } catch (error) {
    console.error('Error sending conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send conversation. Please try again later.'
    });
  }
});

// OpenAI chat endpoint for AaronGPT
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: 'Messages array is required'
      });
    }

    // Rate limiting check - simple in-memory store (for production, use Redis)
    // This prevents abuse of your OpenAI API
    const userIP = req.ip;
    // TODO: Implement proper rate limiting

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to get response from OpenAI');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    res.json({
      success: true,
      message: aiResponse
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 EmailJS configured: ${process.env.EMAILJS_SERVICE_ID}`);
  console.log(`🤖 OpenAI API configured: ${process.env.OPENAI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`🌐 Accepting requests from: ${process.env.CLIENT_URL || 'http://localhost:3005'}\n`);
});
