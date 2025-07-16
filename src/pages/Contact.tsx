import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import ContactForm from "@/components/ContactForm";
import { ArrowLeft, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="font-brand text-4xl md:text-6xl text-gradient-bloom">
              Contact Us
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you! Get in touch and let's create something magical together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 cartoon-shadow">
                <Phone className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-brand text-xl text-blue-600 mb-2">Phone</h3>
                <p className="font-body text-blue-600/80">+971 54 531 4090</p>
                <p className="font-playful text-sm text-blue-600/60 mt-1">Available on WhatsApp</p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 cartoon-shadow">
                <Mail className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-brand text-xl text-purple-600 mb-2">Email</h3>
                <p className="font-body text-purple-600/80">hello@ydbloom.com</p>
                <p className="font-playful text-sm text-purple-600/60 mt-1">We'll get back to you soon!</p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 cartoon-shadow">
                <Clock className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-brand text-xl text-green-600 mb-2">Business Hours</h3>
                <div className="font-body text-green-600/80 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="bg-gradient-sunshine rounded-3xl p-6 cartoon-shadow">
                <MapPin className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="font-brand text-xl text-orange-600 mb-2">Location</h3>
                <p className="font-body text-orange-600/80">Dubai, UAE</p>
                <p className="font-playful text-sm text-orange-600/60 mt-1">Serving families worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Contact;
