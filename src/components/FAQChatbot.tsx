import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Heart, Star, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FAQChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 🌟 I'm Bloom, your magical assistant! I'm here 24/7 to help you with questions about our adorable children's clothing. What would you like to know? ✨",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What ages do you cater to?",
    "Tell me about your quality",
    "How do I place an order?",
    "Do you ship worldwide?",
    "What's your story?"
  ];

  const faqResponses = {
    // Product Information
    ages: "We create magical clothing for little adventurers aged 2-12 years! From toddlers taking their first steps to big kids ready for school adventures! 👶👧👦",
    products: "We offer enchanting children's clothing including casual wear, special occasion outfits, and adventure-ready styles for boys and girls. Every piece is chosen with love! 💕",
    sizes: "We have sizes for ages 2-12 years with detailed size charts on each product. Not sure? Just send your little one's measurements via WhatsApp and we'll help you choose perfectly! 📏",
    quality: "All our clothing is made from premium, child-safe materials. We prioritize comfort, durability, and safety because your little ones deserve the best! 🌟",
    
    // Company Information
    company: "YD Bloom is a family-owned children's clothing business based in sunny Dubai, UAE! We're passionate about creating magical moments for families worldwide! 🏠💫",
    story: "YD Bloom was born from a simple belief: every child deserves to feel magical in what they wear! We started as a small family business with big dreams to spark joy and encourage adventure through beautiful clothing! ✨🎈",
    location: "We're proudly based in Dubai, UAE, but we serve magical families all around the world through our online platform and friendly WhatsApp service! 🌍",
    
    // Ordering & Shopping
    order: "Easy peasy! Browse our magical collection, click 'Add to Cart' on items you love, and you'll be whisked away to WhatsApp where our friendly team will help complete your order! 🛒💬",
    payment: "We keep things simple and safe! We don't process payments online - everything is handled through WhatsApp where we'll guide you through secure payment options in your area! 🔒",
    shipping: "Yes! We deliver magic worldwide! 🚚✨ Shipping costs and delivery times vary by location. Just message us on WhatsApp with your address for exact details!",
    cart: "Your cart items go straight to our WhatsApp! We'll keep track of everything and send you a complete order summary with all the magical details! 📝",
    
    // Contact & Support
    contact: "Reach us anytime via WhatsApp at +971 54 531 4090! I'm here 24/7 for quick questions, and our amazing human team handles orders during business hours! 📱",
    hours: "I'm available 24/7 for all your questions! Our wonderful team handles orders Monday-Friday: 9AM-6PM, Saturday: 10AM-4PM, Sunday: Closed (UAE time) 🕒"
  };

  const getResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Age-related keywords
    if (lowercaseInput.includes('age') || lowercaseInput.includes('old') || lowercaseInput.includes('year')) {
      return faqResponses.ages;
    }
    
    // Product-related keywords
    if (lowercaseInput.includes('product') || lowercaseInput.includes('clothing') || lowercaseInput.includes('clothes') || lowercaseInput.includes('what do you sell')) {
      return faqResponses.products;
    }
    if (lowercaseInput.includes('size') || lowercaseInput.includes('fit') || lowercaseInput.includes('measurement')) {
      return faqResponses.sizes;
    }
    if (lowercaseInput.includes('quality') || lowercaseInput.includes('material') || lowercaseInput.includes('fabric')) {
      return faqResponses.quality;
    }
    
    // Company-related keywords
    if (lowercaseInput.includes('about') || lowercaseInput.includes('company') || lowercaseInput.includes('who are you')) {
      return faqResponses.company;
    }
    if (lowercaseInput.includes('story') || lowercaseInput.includes('history') || lowercaseInput.includes('founded')) {
      return faqResponses.story;
    }
    if (lowercaseInput.includes('location') || lowercaseInput.includes('where') || lowercaseInput.includes('based')) {
      return faqResponses.location;
    }
    
    // Order-related keywords
    if (lowercaseInput.includes('order') || lowercaseInput.includes('buy') || lowercaseInput.includes('purchase') || lowercaseInput.includes('how to shop')) {
      return faqResponses.order;
    }
    if (lowercaseInput.includes('payment') || lowercaseInput.includes('pay') || lowercaseInput.includes('price')) {
      return faqResponses.payment;
    }
    if (lowercaseInput.includes('shipping') || lowercaseInput.includes('delivery') || lowercaseInput.includes('ship')) {
      return faqResponses.shipping;
    }
    if (lowercaseInput.includes('cart') || lowercaseInput.includes('basket')) {
      return faqResponses.cart;
    }
    
    // Contact-related keywords
    if (lowercaseInput.includes('contact') || lowercaseInput.includes('reach') || lowercaseInput.includes('phone') || lowercaseInput.includes('email')) {
      return faqResponses.contact;
    }
    if (lowercaseInput.includes('hours') || lowercaseInput.includes('time') || lowercaseInput.includes('when open')) {
      return faqResponses.hours;
    }
    
    // Greeting responses
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
      return "Hello there, magical friend! 👋✨ Welcome to YD Bloom! I'm here to help you discover the perfect clothing for your little adventurer. What would you like to know? 🌟";
    }
    
    // Complex queries redirect to WhatsApp
    if (lowercaseInput.includes('custom') || lowercaseInput.includes('special request') || lowercaseInput.includes('bulk order') || lowercaseInput.includes('wholesale')) {
      return "Ooh, that sounds exciting! 🎉 For custom orders and special requests, let me connect you with our amazing team via WhatsApp for personalized magic! Click the WhatsApp button! ✨📱";
    }
    
    // Default response with WhatsApp redirect for complex queries
    return "I love helping with questions about our magical clothing, company info, and how to place orders! 🌈 For anything more detailed, our wonderful team is ready to help via WhatsApp at +971 54 531 4090. Try asking about our products, ordering process, or try one of the quick questions below! ✨";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getResponse(inputValue),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue("");
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: question,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getResponse(question),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "+971545314090";
    const message = "Hi! I was chatting with Bloom and need more help. Can you assist me? 🌟";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-all duration-300 cartoon-shadow"
          title="Chat with Bloom ✨"
        >
          <div className="text-2xl animate-bounce">🌸</div>
        </Button>
      )}

      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl w-80 h-[500px] flex flex-col overflow-hidden cartoon-shadow border-4 border-pink-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-4 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl animate-bounce">🌸</div>
              <div>
                <h3 className="font-playful text-white font-bold text-lg">Bloom</h3>
                <p className="text-white/90 text-xs flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  Your Magical Assistant 24/7
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                onClick={handleWhatsAppRedirect}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2 rounded-full"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50 to-pink-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white text-gray-800 border-2 border-pink-200 cartoon-shadow'
                      : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && <span className="text-lg">🌸</span>}
                    {!message.isBot && <span className="text-lg">👤</span>}
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-center text-sm text-gray-600 font-playful">
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  Quick Questions:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-white hover:bg-pink-50 border-pink-200 text-pink-600 rounded-full font-medium"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-pink-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything magical... ✨"
                className="flex-1 rounded-full border-pink-200 focus:border-purple-300"
              />
              <Button 
                onClick={handleSend} 
                size="sm" 
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 rounded-full px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQChatbot;