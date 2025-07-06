import { Shirt, Heart, Truck, RotateCcw, Shield, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <Shirt className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Soft, durable fabrics that feel amazing on delicate skin",
      emoji: "✨",
      color: "bg-gradient-bloom"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Made with Love",
      description: "Every stitch tells a story of care and attention to detail",
      emoji: "💝",
      color: "bg-gradient-sunshine"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Delivery",
      description: "Fast, free shipping on all orders above $50",
      emoji: "🚚",
      color: "bg-secondary"
    },
    {
      icon: <RotateCcw className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns if you're not completely happy",
      emoji: "🔄",
      color: "bg-accent"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety First",
      description: "All materials are tested and certified safe for children",
      emoji: "🛡️",
      color: "bg-gradient-bloom"
    },
    {
      icon: <Smile className="h-8 w-8" />,
      title: "Kid Approved",
      description: "Designed by parents, tested by kids, loved by families",
      emoji: "😊",
      color: "bg-gradient-sunshine"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 bounce-in">
          <h2 className="font-brand text-4xl md:text-5xl text-gradient-bloom mb-4">
            Why Parents Love Us
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            We understand what matters most to you and your little ones. 
            Here's what makes YD Bloom special.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="product-card-hover cartoon-shadow border-2 border-primary/10 bg-gradient-to-br from-card to-background overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} text-white mb-4 cartoon-shadow float-gentle`}>
                  {feature.icon}
                </div>

                {/* Emoji */}
                <div className="text-2xl mb-3 mascot-wave" style={{ animationDelay: `${index * 0.2}s` }}>
                  {feature.emoji}
                </div>

                {/* Title */}
                <h3 className="font-playful font-semibold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;