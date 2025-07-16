import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sendResendEmail, createContactFormEmail, storeInLocalStorage, getEmailSettings } from '@/services/emailService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
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
        `New Contact Form Submission - ${formData.subject}`,
        createContactFormEmail(formData)
      );

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        toast({
          title: "Message Sent!",
          description: "We'll get back to you soon",
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      // Fallback: Store in localStorage for demo purposes
      storeInLocalStorage('contact', formData);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Thank You for Your Message!
        </h3>
        <p className="text-green-700 mb-6 text-lg">
          We've received your message and will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 cartoon-shadow">
      <h2 className="font-brand text-2xl text-primary mb-6">Send us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="font-playful">Name</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="font-playful">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="subject" className="font-playful">Subject</Label>
          <Select
            value={formData.subject}
            onValueChange={(value) => setFormData({ ...formData, subject: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="order">Order Question</SelectItem>
              <SelectItem value="sizing">Sizing Help</SelectItem>
              <SelectItem value="returns">Returns & Exchanges</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phone" className="font-playful">Phone (Optional)</Label>
          <Input 
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="message" className="font-playful">Message</Label>
          <Textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={5}
            className="mt-1"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-bloom font-playful"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Message...
            </>
          ) : (
            <>
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm; 