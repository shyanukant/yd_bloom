# Email Settings Admin Panel Guide

This guide explains how to configure email settings directly from your admin panel.

## 🎉 New Feature: Email Settings in Admin Panel

You can now configure your email service settings directly from the admin panel without editing code!

## 📍 How to Access Email Settings

1. **Login to Admin Panel**
   - Go to `/admin` in your browser
   - Login with your admin credentials
   - Demo credentials: `admin@demo.com` / `demo123`

2. **Navigate to Email Settings**
   - Click the "Email Settings" tab in the admin panel
   - You'll see a comprehensive email configuration interface

## ⚙️ Email Settings Configuration

### Service Selection
Choose from three email service providers:

- **Resend** (Recommended) - 3000 emails/month free
- **EmailJS** - 200 emails/month free  
- **Formspree** - 50 submissions/month free

### Required Fields

1. **API Key**
   - Get your API key from your chosen service provider
   - Click the eye icon to show/hide the API key
   - Required for all services

2. **From Email**
   - Email address that will appear as sender
   - For Resend: Use your verified domain or `onboarding@resend.dev` for testing
   - For other services: Use your registered email

3. **Admin Email**
   - Email address where you'll receive notifications
   - Contact form submissions and newsletter subscriptions will be sent here
   - Required for all services

4. **Enable/Disable Toggle**
   - Turn email notifications on/off
   - When disabled, forms will use localStorage fallback

## 🔧 Step-by-Step Setup

### For Resend (Recommended)

1. **Sign up at Resend.com**
   - Go to [resend.com](https://resend.com/)
   - Create a free account
   - Verify your email

2. **Get API Key**
   - In Resend dashboard, go to "API Keys"
   - Click "Create API Key"
   - Copy the key (starts with `re_`)

3. **Configure in Admin Panel**
   - Select "Resend" as service
   - Paste your API key
   - Set From Email: `onboarding@resend.dev` (for testing)
   - Set Admin Email: your email address
   - Enable the service

4. **Test Configuration**
   - Click "Test Email" button
   - Check your admin email for test message
   - If successful, your setup is working!

### For EmailJS

1. **Sign up at EmailJS.com**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Create a free account

2. **Set up Email Service**
   - Create email service (Gmail, Outlook, etc.)
   - Create email templates
   - Get your credentials

3. **Configure in Admin Panel**
   - Select "EmailJS" as service
   - Enter your API credentials
   - Set From Email and Admin Email
   - Enable the service

### For Formspree

1. **Sign up at Formspree.io**
   - Go to [formspree.io](https://formspree.io/)
   - Create a free account

2. **Create Forms**
   - Create forms for contact and newsletter
   - Get your form endpoints

3. **Configure in Admin Panel**
   - Select "Formspree" as service
   - Enter your form endpoints
   - Set Admin Email
   - Enable the service

## 🧪 Testing Your Configuration

### Test Email Feature
- Click "Test Email" button in admin panel
- System will send a test email to your admin email
- Check your inbox (and spam folder)
- Success message confirms working configuration

### Test Contact Form
1. Go to your website's Contact page
2. Fill out the contact form
3. Submit the form
4. Check your admin email for notification

### Test Newsletter Widget
1. Go to any page with newsletter widget
2. Enter an email address
3. Click Subscribe
4. Check your admin email for notification

## 🔒 Security Features

- **API Key Protection**: Keys are stored securely in localStorage
- **Show/Hide Toggle**: API keys are hidden by default
- **Validation**: All required fields are validated before saving
- **Error Handling**: Clear error messages for configuration issues

## 📊 Monitoring

### Admin Panel Status
The email settings page shows current status:
- **Service**: Which email service is selected
- **Enabled**: Whether email notifications are active
- **From Email**: Configured sender email
- **Admin Email**: Notification recipient
- **API Key**: Whether API key is configured

### Email Delivery
- Check your email service dashboard for delivery rates
- Monitor spam folder for test emails
- Review email service logs for any issues

## 🚨 Troubleshooting

### Common Issues

1. **"Email service not configured or disabled"**
   - Go to admin panel → Email Settings
   - Configure your email service
   - Enable the service toggle

2. **"Invalid API key"**
   - Check your API key is correct
   - Ensure it starts with correct prefix (e.g., `re_` for Resend)
   - Verify the key is active in your service dashboard

3. **"Test email failed"**
   - Check your API key is valid
   - Verify your From Email is correct
   - Check spam folder for test emails
   - Review service dashboard for errors

4. **"Domain not verified" (Resend)**
   - Use `onboarding@resend.dev` for testing
   - Or verify your domain in Resend dashboard

### Testing Steps

1. **Start with Test Domain**
   - Use `onboarding@resend.dev` for Resend testing
   - This doesn't require domain verification

2. **Check Spam Folder**
   - Test emails might go to spam initially
   - Whitelist your domain after verification

3. **Monitor Service Dashboard**
   - Check your email service dashboard for delivery status
   - Review logs for any error messages

## 💡 Best Practices

1. **Start with Resend**
   - Most generous free tier (3000 emails/month)
   - Easy to set up and use
   - Great deliverability

2. **Use Test Domain First**
   - Use `onboarding@resend.dev` for initial testing
   - Verify your domain later for production

3. **Test Thoroughly**
   - Test both contact form and newsletter
   - Check admin email notifications
   - Monitor delivery rates

4. **Backup Configuration**
   - Settings are stored in localStorage
   - Export settings if needed for backup

## 🔄 Migration from Hardcoded Settings

If you were using hardcoded email settings before:

1. **Old Method**: Edit `src/services/emailService.ts`
2. **New Method**: Use admin panel → Email Settings
3. **Benefits**: 
   - No code changes needed
   - Easy to switch between services
   - Test configuration directly
   - Secure API key management

## 📈 Scaling

### Free Tier Limits
- **Resend**: 3000 emails/month
- **EmailJS**: 200 emails/month
- **Formspree**: 50 submissions/month

### Paid Plans (if needed)
- **Resend**: $20/month for 50,000 emails
- **EmailJS**: $15/month for 1,000 emails
- **Formspree**: $23/month for 1,000 submissions

## 🎯 Features Summary

✅ **Admin Panel Integration**
- Configure email settings without code changes
- Test email functionality directly
- Monitor configuration status

✅ **Multiple Service Support**
- Resend (recommended)
- EmailJS
- Formspree

✅ **Security & Privacy**
- Secure API key storage
- Show/hide toggle for sensitive data
- Input validation

✅ **Testing & Monitoring**
- Built-in test email feature
- Configuration status display
- Error handling and feedback

✅ **User-Friendly Interface**
- Clear form layout
- Helpful placeholder text
- Status indicators

---

## 🚀 Quick Start

1. **Login to Admin Panel**: `/admin`
2. **Go to Email Settings**: Click the "Email Settings" tab
3. **Choose Service**: Select Resend (recommended)
4. **Enter API Key**: Get from [resend.com](https://resend.com/)
5. **Set Emails**: Configure From Email and Admin Email
6. **Enable Service**: Toggle the enable switch
7. **Test Configuration**: Click "Test Email"
8. **Save Settings**: Click "Save Settings"

Your email system is now configured and ready to use! 🎉 