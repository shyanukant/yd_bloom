import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const WhatsAppChat = () => {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = "+971545314090";
    const message = "Hi! I'm interested in YD Bloom children's clothing. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return <div className="fixed bottom-6 right-6 z-50">
      
      
      {/* Chat bubble with message */}
      
    </div>;
};
export default WhatsAppChat;