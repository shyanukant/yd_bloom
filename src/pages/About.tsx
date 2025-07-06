import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Users, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
              About YD Bloom
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Where dreams meet style - Creating magical moments for your little ones since day one.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 cartoon-shadow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-brand text-3xl text-primary mb-4">Our Story</h2>
                <p className="font-body text-muted-foreground mb-4">
                  YD Bloom was born from a simple belief: every child deserves to feel magical in what they wear. 
                  We started as a small family business with a big dream - to create clothing that sparks joy, 
                  encourages adventure, and grows with your child's imagination.
                </p>
                <p className="font-body text-muted-foreground">
                  Today, we continue to handpick every piece with love, ensuring that comfort meets style 
                  in every thread. Because childhood is a journey, and we're here to dress it beautifully.
                </p>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">🌸</div>
                <p className="font-playful text-primary">Growing with Grace</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl cartoon-shadow">
              <Heart className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="font-brand text-xl text-blue-600">Made with Love</h3>
              <p className="font-body text-blue-600/80">
                Every piece is carefully selected with your child's comfort and happiness in mind.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl cartoon-shadow">
              <Star className="h-12 w-12 text-purple-600 mx-auto" />
              <h3 className="font-brand text-xl text-purple-600">Quality First</h3>
              <p className="font-body text-purple-600/80">
                Premium materials and craftsmanship that stands up to endless adventures.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl cartoon-shadow">
              <Users className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="font-brand text-xl text-green-600">Family Values</h3>
              <p className="font-body text-green-600/80">
                Supporting families by creating clothes that bring joy to everyday moments.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-sunshine rounded-3xl p-8 md:p-12 cartoon-shadow text-center">
            <Award className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h2 className="font-brand text-3xl text-orange-600 mb-4">Our Mission</h2>
            <p className="font-body text-orange-600/90 text-lg max-w-2xl mx-auto mb-6">
              To create a world where every child feels confident, comfortable, and ready for adventure. 
              We believe that the right outfit can spark imagination and turn ordinary days into extraordinary memories.
            </p>
            <Link to="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-playful">
                Discover Our Collection
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
      <FAQChatbot />
    </div>
  );
};

export default About;