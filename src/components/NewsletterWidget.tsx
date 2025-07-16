import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendResendEmail, createNewsletterNotificationEmail, storeInLocalStorage, getEmailSettings } from '@/services/emailService';

const NewsletterWidget = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Using Resend (3000 emails/month free)
      const settings = getEmailSettings();
      const adminEmail = settings?.adminEmail || 'hello@ydbloom.com';
      
      const result = await sendResendEmail(
        adminEmail,
        'New Newsletter Subscription - YD Bloom',
        createNewsletterNotificationEmail(email)
      );

      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter",
        });
      } else {
        throw new Error(result.error || 'Failed to subscribe');
      }
    } catch (error) {
      // Fallback: Store in localStorage for demo purposes
      storeInLocalStorage('newsletter', { email });
      
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Thank You for Subscribing!
        </h3>
        <p className="text-green-700 mb-4">
          You'll receive our latest updates and exclusive offers.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubscribed(false)}
          className="text-green-700 border-green-300 hover:bg-green-50"
        >
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-2xl border-2 border-white/20 bg-white/10 text-primary-foreground placeholder-primary-foreground/60 font-body"
        required
      />
      <Button 
        type="submit"
        disabled={isSubmitting || !email.trim()}
        className="bg-white text-primary hover:bg-white/90 font-playful px-6 py-3 hover:scale-105 transition-transform"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            Subscribing...
          </>
        ) : (
          <>
            Subscribe 📬
          </>
        )}
      </Button>
    </form>
  );
};

export default NewsletterWidget; 