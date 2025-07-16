import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Mail, TestTube, Save, Eye, EyeOff } from 'lucide-react';

interface EmailSettings {
  apiKey: string;
  fromEmail: string;
  adminEmail: string;
  isEnabled: boolean;
}

const EmailSettings = () => {
  const [settings, setSettings] = useState<EmailSettings>({
    apiKey: '',
    fromEmail: '',
    adminEmail: '',
    isEnabled: false
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('email_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: EmailSettings) => {
    localStorage.setItem('email_settings', JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!settings.apiKey.trim()) {
        toast({
          title: "Error",
          description: "API Key is required",
          variant: "destructive"
        });
        return;
      }

      if (!settings.fromEmail.trim()) {
        toast({
          title: "Error",
          description: "From Email is required",
          variant: "destructive"
        });
        return;
      }

      if (!settings.adminEmail.trim()) {
        toast({
          title: "Error",
          description: "Admin Email is required",
          variant: "destructive"
        });
        return;
      }

      // Save settings
      saveSettings(settings);
      
      toast({
        title: "Success",
        description: "Email settings saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    try {
      // Test email functionality
      const testResult = await sendTestEmail();
      
      if (testResult.success) {
        toast({
          title: "Test Successful",
          description: "Test email sent successfully. Check your admin email."
        });
      } else {
        toast({
          title: "Test Failed",
          description: testResult.error || "Failed to send test email",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Test Failed",
        description: "An error occurred during testing",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const sendTestEmail = async () => {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${settings.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: settings.fromEmail,
          to: [settings.adminEmail],
          subject: 'Test Email - YD Bloom Email Settings',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Test Email</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #8B5CF6;">✅ Email Test Successful!</h2>
                    <p>Hello,</p>
                    <p>This is a test email to verify your email settings are working correctly.</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Service:</strong> Resend</p>
                        <p><strong>From Email:</strong> ${settings.fromEmail}</p>
                        <p><strong>Admin Email:</strong> ${settings.adminEmail}</p>
                        <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <p>Your email configuration is working properly!</p>
                    <p>Best regards,<br>YD Bloom Team</p>
                </div>
            </body>
            </html>
          `
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send test email');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
            <Badge variant="secondary">Resend - 3000 emails/month free</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key */}
          <div>
            <Label htmlFor="apiKey" className="flex items-center gap-2">
              Resend API Key
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </Label>
            <Input
              id="apiKey"
              type={showApiKey ? "text" : "password"}
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              placeholder="re_your_api_key_here"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Get your API key from <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">resend.com</a>
            </p>
          </div>

          {/* From Email */}
          <div>
            <Label htmlFor="fromEmail">From Email</Label>
            <Input
              id="fromEmail"
              type="email"
              value={settings.fromEmail}
              onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
              placeholder="hello@ydbloom.com"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Use your verified domain or onboarding@resend.dev for testing
            </p>
          </div>

          {/* Admin Email */}
          <div>
            <Label htmlFor="adminEmail">Admin Email (Notifications)</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              placeholder="admin@ydbloom.com"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Email address where you'll receive contact form and newsletter notifications
            </p>
          </div>

          {/* Enable/Disable */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isEnabled"
              checked={settings.isEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, isEnabled: checked })}
            />
            <Label htmlFor="isEnabled">Enable Email Notifications</Label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
            
            <Button 
              onClick={handleTest} 
              disabled={isTesting || !settings.isEnabled}
              variant="outline"
              className="flex items-center gap-2"
            >
              <TestTube className="h-4 w-4" />
              {isTesting ? "Testing..." : "Test Email"}
            </Button>
          </div>

          {/* Status */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Current Status</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Service:</strong> Resend</p>
              <p><strong>Enabled:</strong> {settings.isEnabled ? "Yes" : "No"}</p>
              <p><strong>From Email:</strong> {settings.fromEmail || "Not set"}</p>
              <p><strong>Admin Email:</strong> {settings.adminEmail || "Not set"}</p>
              <p><strong>API Key:</strong> {settings.apiKey ? "Configured" : "Not set"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings; 