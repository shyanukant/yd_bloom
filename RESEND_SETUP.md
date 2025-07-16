# Resend Email Setup Guide for YD Bloom

This guide will help you set up Resend for your newsletter and contact forms with **3000 emails per month for free**.

## 🚀 Why Resend?

- **3000 emails/month** (vs 200 with EmailJS)
- **Simple API** - easy to integrate
- **Great deliverability** - emails reach inbox
- **Free tier** - no credit card required
- **Webhooks** - real-time notifications
- **Analytics** - track email performance

## 📧 Setup Steps

### Step 1: Create Resend Account

1. Go to [Resend.com](https://resend.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get Your API Key

1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give it a name (e.g., "YD Bloom Website")
4. Copy the API key (starts with `re_`)

### Step 3: Update Configuration

1. Open `src/services/emailService.ts`
2. Replace the placeholder API key:

```typescript
export const RESEND_CONFIG = {
  API_KEY: 're_your_actual_api_key_here', // Replace with your real API key
  FROM_EMAIL: 'hello@ydbloom.com', // Your verified domain or use resend.dev for testing
};
```

### Step 4: Test Your Setup

1. Start your development server: `npm run dev`
2. Go to your contact form or newsletter widget
3. Submit a test message
4. Check your admin email for the notification

## 🔧 Configuration Options

### Option A: Use Your Domain (Recommended)

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Add your domain (e.g., `ydbloom.com`)
4. Follow the DNS setup instructions
5. Update `FROM_EMAIL` to use your domain

### Option B: Use Resend's Test Domain

For testing, you can use Resend's test domain:
```typescript
FROM_EMAIL: 'onboarding@resend.dev'
```

## 📧 Email Templates

The system includes beautiful HTML email templates:

### Newsletter Notification
- Subject: "New Newsletter Subscription - YD Bloom"
- Includes subscriber email and date
- Professional styling with your brand colors

### Contact Form Notification
- Subject: "New Contact Form Submission - [Subject]"
- Includes all form fields (name, email, phone, subject, message)
- Formatted message display
- Professional styling

## 🎯 Features Implemented

### ✅ Contact Form
- **Form validation** - email format, required fields
- **Multiple fields** - name, email, phone, subject, message
- **Subject dropdown** - predefined options
- **Loading states** - visual feedback during submission
- **Success feedback** - confirmation message
- **Error handling** - user-friendly error messages
- **Fallback storage** - localStorage for demo/testing

### ✅ Newsletter Widget
- **Email validation** - proper format checking
- **Loading states** - spinner during subscription
- **Success feedback** - confirmation message
- **Error handling** - clear error messages
- **Fallback storage** - localStorage for demo/testing

## 🔒 Security & Privacy

- ✅ **API key** stored in environment variables
- ✅ **Email validation** on frontend
- ✅ **No sensitive data** in client-side code
- ✅ **CORS-safe** - no browser restrictions
- ✅ **Rate limiting** - built into Resend API

## 📊 Monitoring & Analytics

### Resend Dashboard
- **Email delivery rates**
- **Bounce rates**
- **Spam complaints**
- **Real-time logs**

### Local Storage (Demo Mode)
- **Contact messages**: `contact_messages`
- **Newsletter subscribers**: `newsletter_subscribers`

## 🚨 Troubleshooting

### Common Issues

1. **"Invalid API key"**
   - Check your API key in `emailService.ts`
   - Ensure it starts with `re_`

2. **"Domain not verified"**
   - Use `onboarding@resend.dev` for testing
   - Or verify your domain in Resend dashboard

3. **"Rate limit exceeded"**
   - Free tier: 3000 emails/month
   - Check usage in Resend dashboard

4. **"CORS error"**
   - Resend API doesn't have CORS restrictions
   - Check your fetch request format

### Testing

1. **Test with demo mode first**
   - Uses localStorage fallback
   - No external dependencies

2. **Test with Resend**
   - Use test domain initially
   - Check spam folder for test emails

3. **Monitor dashboard**
   - Check Resend dashboard for delivery status
   - Review logs for any errors

## 💡 Best Practices

1. **Start with test domain** - `onboarding@resend.dev`
2. **Verify your domain** - better deliverability
3. **Monitor spam folder** - test emails might go there
4. **Use environment variables** - don't commit API keys
5. **Test thoroughly** - both success and error scenarios

## 🔄 Migration from EmailJS

If you were using EmailJS before:

1. **Keep EmailJS config** - as backup option
2. **Update components** - already done ✅
3. **Test thoroughly** - ensure emails are sent
4. **Monitor delivery** - check both services

## 📈 Scaling

### Free Tier Limits
- **3000 emails/month** - generous for most sites
- **No daily limits** - flexible usage
- **No credit card required** - truly free

### Paid Plans (if needed)
- **$20/month** - 50,000 emails
- **$99/month** - 500,000 emails
- **Custom plans** - for high volume

## 🎉 Success!

Your email system is now configured with Resend and will:
- Send **3000 emails per month** for free
- Provide **professional email templates**
- Include **comprehensive error handling**
- Support **both contact forms and newsletter**
- Offer **localStorage fallback** for testing

---

## 📞 Support

- **Resend Support**: [support@resend.com](mailto:support@resend.com)
- **Documentation**: [resend.com/docs](https://resend.com/docs)
- **API Reference**: [resend.com/api](https://resend.com/api)

---

**Next Steps:**
1. Sign up at [resend.com](https://resend.com/)
2. Get your API key
3. Update `src/services/emailService.ts`
4. Test your forms
5. Monitor delivery in Resend dashboard 