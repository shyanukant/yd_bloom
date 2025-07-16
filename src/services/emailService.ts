// Email Service Configuration
// This file contains setup instructions and configurations for Resend email service

// Get email settings from admin panel
export const getEmailSettings = () => {
  const savedSettings = localStorage.getItem('email_settings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return null;
};

// Resend Configuration (3000 emails/month free)
// Setup: https://resend.com/
// 1. Sign up for free account
// 2. Get your API key
// 3. Verify your domain (optional but recommended)
// 4. Configure in admin panel

export const RESEND_CONFIG = {
  API_KEY: 're_your_api_key_here', // Will be overridden by admin panel settings
  FROM_EMAIL: 'hello@ydbloom.com', // Will be overridden by admin panel settings
};

// Helper function to send email via Resend
export const sendResendEmail = async (to: string, subject: string, htmlContent: string) => {
  try {
    const settings = getEmailSettings();
    if (!settings || !settings.isEnabled) {
      throw new Error('Email service not configured or disabled');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: settings.fromEmail,
        to: [to],
        subject: subject,
        html: htmlContent,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false, error: error.message };
  }
};

// Demo mode fallback - stores in localStorage
export const storeInLocalStorage = (type: 'newsletter' | 'contact', data: any) => {
  const key = type === 'newsletter' ? 'newsletter_subscribers' : 'contact_messages';
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ ...data, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(existing));
  return { success: true };
};

// Email templates for Resend
export const createNewsletterNotificationEmail = (email: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Newsletter Subscription</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8B5CF6;">🎉 New Newsletter Subscription!</h2>
        <p>Hello,</p>
        <p>A new user has subscribed to your newsletter:</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p>Best regards,<br>YD Bloom Team</p>
    </div>
</body>
</html>
`;

export const createContactFormEmail = (formData: any) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8B5CF6;">📧 New Contact Form Submission</h2>
        <p>Hello,</p>
        <p>You have received a new contact form submission:</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #8B5CF6;">
                ${formData.message.replace(/\n/g, '<br>')}
            </div>
        </div>
        <p>Best regards,<br>YD Bloom Team</p>
    </div>
</body>
</html>
`; 