# Email Setup Guide for YD Bloom

This guide will help you set up free email functionality for your newsletter and contact forms.

## 🎯 Quick Start Options

### Option 1: EmailJS (Recommended - Free Tier)
**Best for:** Easy setup, good free tier, reliable service

#### Setup Steps:
1. **Sign up** at [EmailJS.com](https://www.emailjs.com/)
2. **Create Email Service:**
   - Go to Email Services → Add New Service
   - Choose Gmail, Outlook, or other provider
   - Connect your email account
3. **Create Email Templates:**
   - Go to Email Templates → Create New Template
   - Create templates for newsletter and contact forms
4. **Get Credentials:**
   - Copy your `service_id`, `template_id`, and `user_id`
   - Update `src/services/emailService.ts`

#### Free Tier Limits:
- 200 emails per month
- 2 email templates
- 1 email service

---

### Option 2: Formspree (Alternative - Free Tier)
**Best for:** Simple forms, no email setup required

#### Setup Steps:
1. **Sign up** at [Formspree.io](https://formspree.io/)
2. **Create Forms:**
   - Create a form for newsletter subscriptions
   - Create a form for contact messages
3. **Get Endpoints:**
   - Copy your form endpoints
   - Update `src/services/emailService.ts`

#### Free Tier Limits:
- 50 submissions per month
- Spam protection
- Email notifications

---

### Option 3: Netlify Forms (If hosting on Netlify)
**Best for:** If you're hosting on Netlify

#### Setup Steps:
1. **Deploy to Netlify**
2. **Add form attributes:**
   ```html
   <form name="newsletter" netlify>
   <form name="contact" netlify>
   ```
3. **View submissions** in Netlify dashboard

#### Free Tier Limits:
- 100 submissions per month
- Spam filtering
- Email notifications

---

## 📧 Email Template Examples

### Newsletter Template (EmailJS)
```
Subject: New Newsletter Subscription - YD Bloom

Hello,

A new user has subscribed to your newsletter:

Email: {{email}}
Date: {{date}}

Best regards,
YD Bloom Team
```

### Contact Form Template (EmailJS)
```
Subject: New Contact Form Submission - YD Bloom

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}
Message: {{message}}

Best regards,
YD Bloom Team
```

---

## 🔧 Configuration

### Update EmailJS Configuration
Edit `src/services/emailService.ts`:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // e.g., 'gmail'
  TEMPLATE_ID: 'your_template_id', // e.g., 'template_abc123'
  USER_ID: 'your_user_id', // e.g., 'user_xyz789'
  
  NEWSLETTER_SERVICE_ID: 'yd_bloom_newsletter',
  NEWSLETTER_TEMPLATE_ID: 'newsletter_subscription',
  
  CONTACT_SERVICE_ID: 'yd_bloom_contact',
  CONTACT_TEMPLATE_ID: 'contact_form',
};
```

### Update Formspree Configuration
```typescript
export const FORMSPREE_CONFIG = {
  NEWSLETTER_ENDPOINT: 'https://formspree.io/f/your_newsletter_form_id',
  CONTACT_ENDPOINT: 'https://formspree.io/f/your_contact_form_id',
};
```

---

## 🎨 Features Implemented

### Newsletter Widget
- ✅ **Email validation**
- ✅ **Loading states**
- ✅ **Success feedback**
- ✅ **Fallback to localStorage**
- ✅ **Beautiful design**

### Contact Form
- ✅ **Form validation**
- ✅ **Multiple fields** (name, email, phone, subject, message)
- ✅ **Subject dropdown**
- ✅ **Loading states**
- ✅ **Success feedback**
- ✅ **Fallback to localStorage**

### Demo Mode
- ✅ **localStorage storage** for testing
- ✅ **No external dependencies** for demo
- ✅ **Easy to switch** to real email service

---

## 🚀 Testing

### Test Newsletter:
1. Go to any page with footer
2. Enter email in newsletter widget
3. Submit and check success message
4. Check localStorage for stored data

### Test Contact Form:
1. Go to Contact page
2. Fill out contact form
3. Submit and check success message
4. Check localStorage for stored data

---

## 📱 Mobile Responsive

Both components are fully responsive and work on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

---

## 🔒 Privacy & Security

- ✅ **Email validation** on frontend
- ✅ **No sensitive data** in code
- ✅ **localStorage fallback** for demo
- ✅ **User-friendly** error messages

---

## 💡 Tips

1. **Start with EmailJS** - easiest to set up
2. **Test with demo mode** first
3. **Use Gmail** for email service (most reliable)
4. **Monitor spam folder** for test emails
5. **Backup submissions** regularly

---

## 🆘 Troubleshooting

### Common Issues:
1. **Emails not sending:** Check credentials in `emailService.ts`
2. **CORS errors:** Use EmailJS or Formspree (no CORS issues)
3. **Spam filtering:** Check spam folder, whitelist your domain
4. **Rate limiting:** Free tiers have limits, monitor usage

### Support:
- EmailJS: [support@emailjs.com](mailto:support@emailjs.com)
- Formspree: [help@formspree.io](mailto:help@formspree.io)
- Netlify: [support.netlify.com](https://support.netlify.com) 