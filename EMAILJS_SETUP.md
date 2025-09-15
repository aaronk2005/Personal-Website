# EmailJS Setup Instructions

Your AaronGPT chatbot now has email functionality! Visitors can send their conversations directly to aaron.kleiman@queensu.ca. Here's how to set it up:

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service
1. Go to Email Services in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Important**: Make sure the service can send TO aaron.kleiman@queensu.ca
6. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Go to Email Templates in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: {{subject}}

From: {{from_name}}
To: {{to_email}}

{{message}}
```

4. Test the template
5. Copy the **Template ID** (you'll need this)

## Step 4: Get Your Public Key
1. Go to Account Settings
2. Find your **Public Key** in the API Keys section
3. Copy the **Public Key** (you'll need this)

## Step 5: Update Your Environment Variables
1. Open the `.env.local` file in your project
2. Replace the placeholder values:

```bash
VITE_EMAILJS_SERVICE_ID="your_actual_service_id_here"
VITE_EMAILJS_TEMPLATE_ID="your_actual_template_id_here"
VITE_EMAILJS_PUBLIC_KEY="your_actual_public_key_here"
```

## Step 6: Test the Integration
1. Run your development server: `npm run dev`
2. Open the AaronGPT chatbot
3. Have a short conversation
4. Click the "📧 Email Aaron" button
5. Check aaron.kleiman@queensu.ca for the email

## Features Added:
- ✅ Email button appears after user starts a conversation
- ✅ Sends the entire conversation with timestamp
- ✅ Includes proper formatting and context
- ✅ Handles errors gracefully with fallback messaging
- ✅ Button is disabled while sending to prevent spam
- ✅ User-friendly success/error messages

## Email Format:
The emails will include:
- Timestamp of the conversation
- Complete conversation thread (Visitor/AaronGPT messages)
- Clear formatting for easy reading
- Source identification (from portfolio website)

## Security Notes:
- EmailJS keys are safe to use in frontend code
- Rate limiting is handled by EmailJS (200 emails/month on free plan)
- No sensitive data is exposed
- Users can only send to your predefined email address

## Troubleshooting:
- If emails don't send: Check the browser console for errors
- Verify all three environment variables are set correctly
- Ensure EmailJS service is configured to send to your email
- Check your spam folder for test emails