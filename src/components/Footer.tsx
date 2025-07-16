import { Flower, Heart, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterWidget from "./NewsletterWidget";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-foreground/5 to-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Flower className="h-6 w-6 text-primary float-gentle" />
              <h3 className="font-brand text-2xl text-gradient-bloom">YD BLOOM</h3>
            </div>
            <p className="font-body text-muted-foreground mb-4 leading-relaxed">
              Growing with grace, styled with love. Creating magical moments 
              through beautiful children's clothing.
            </p>
            <div className="flex space-x-2">
              {['🌸', '🦋', '🌈', '⭐'].map((emoji, index) => (
                <span 
                  key={index} 
                  className="text-xl float-gentle" 
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-playful font-semibold text-foreground mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2 font-body">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Boys Collection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Girls Collection</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Sale Items</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Size Guide</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-1">
            <h4 className="font-playful font-semibold text-foreground mb-4 text-lg">
              Customer Care
            </h4>
            <ul className="space-y-2 font-body">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Return Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Track Your Order</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:wiggle">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="font-playful font-semibold text-foreground mb-4 text-lg">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-body">+971 545314090</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-body">hello@ydbloom.com</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span className="font-body">
                  Dubai, UAE<br />
                  Growing everywhere with love
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="font-playful text-sm text-muted-foreground mb-2">Follow our journey:</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hover:scale-110 transition-transform">
                  📘 Facebook
                </Button>
                <Button variant="outline" size="sm" className="hover:scale-110 transition-transform">
                  📷 Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-bloom rounded-3xl p-8 mb-8 text-center cartoon-shadow">
          <h3 className="font-brand text-2xl text-primary-foreground mb-2">
            Join Our Blooming Family! 🌸
          </h3>
          <p className="font-body text-primary-foreground/80 mb-6">
            Get the latest styles, exclusive offers, and parenting tips delivered to your inbox.
          </p>
          <NewsletterWidget />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-muted-foreground text-sm">
              © 2024 YD Bloom. Made with <Heart className="inline h-4 w-4 text-red-400 mx-1" /> for little dreamers.
            </p>
            <div className="flex space-x-6 text-sm font-body">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;