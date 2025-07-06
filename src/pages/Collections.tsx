import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="space-y-4">
            <h1 className="font-brand text-4xl md:text-6xl text-gradient-bloom">
              Our Collections
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections, each telling a unique story 
              of adventure, comfort, and timeless style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Link to="/boys" className="group">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 cartoon-shadow hover:scale-105 transition-all group-hover:shadow-xl">
                <div className="text-6xl mb-4 group-hover:animate-bounce">👦</div>
                <h3 className="font-brand text-2xl text-blue-600 mb-2">Boys Collection</h3>
                <p className="font-body text-blue-600/80">Adventure-ready styles</p>
              </div>
            </Link>

            <Link to="/girls" className="group">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-8 cartoon-shadow hover:scale-105 transition-all group-hover:shadow-xl">
                <div className="text-6xl mb-4 group-hover:animate-bounce">👧</div>
                <h3 className="font-brand text-2xl text-pink-600 mb-2">Girls Collection</h3>
                <p className="font-body text-pink-600/80">Magical princess outfits</p>
              </div>
            </Link>

            <Link to="/new-arrivals" className="group">
              <div className="bg-gradient-to-br from-purple-100 to-yellow-100 rounded-3xl p-8 cartoon-shadow hover:scale-105 transition-all group-hover:shadow-xl">
                <div className="text-6xl mb-4 group-hover:animate-pulse">✨</div>
                <h3 className="font-brand text-2xl text-purple-600 mb-2">New Arrivals</h3>
                <p className="font-body text-purple-600/80">Fresh styles just landed</p>
              </div>
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

export default Collections;