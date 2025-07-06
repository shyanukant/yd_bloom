import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductShowcase />
      <Features />
      <Footer />
      <WhatsAppChat />
      <FAQChatbot />
    </div>
  );
};

export default Index;
