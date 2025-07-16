import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/services/productService";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    addToCart(product);
    
    // Redirect to WhatsApp with single product
    const phoneNumber = "+971545314090";
    const message = `Hi! I'm interested in this product from YD Bloom:

${product.name}
Price: ${formatPrice(product.price)}
Description: ${product.description}

Can you help me with ordering and shipping details?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Format price for display
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') {
      // If price is already formatted as string (e.g., "$25.99"), return as is
      if (price.startsWith('$')) {
        return price;
      }
      // If price is a string number, convert to number first
      const numPrice = parseFloat(price);
      return `$${numPrice.toFixed(2)}`;
    }
    // If price is a number, format it
    return `$${price.toFixed(2)}`;
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className="product-card-hover cartoon-shadow bg-gradient-to-br from-card to-muted/30 border-2 border-primary/20 overflow-hidden"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardContent className="p-0">
          {/* Product Image Area */}
          <div className="relative bg-gradient-sunshine p-8 text-center">
            {/* Badges */}
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 text-xs font-playful rounded-full wiggle">
                New!
              </span>
            )}
            {product.isPopular && (
              <span className="absolute top-2 left-2 bg-secondary text-secondary-foreground px-2 py-1 text-xs font-playful rounded-full wiggle">
                Popular
              </span>
            )}
            
            {/* Heart Icon */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 p-1 hover:scale-110 transition-transform"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4 hover:fill-current hover:text-red-400" />
            </Button>

            {/* Product Emoji/Image */}
            <div className="text-6xl mb-2 mascot-wave" style={{ animationDelay: `${index * 0.2}s` }}>
              {(product.mainImage || product.realImage) ? (
                <img 
                  src={product.mainImage || product.realImage} 
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                product.emoji
              )}
            </div>
            <div className="text-2xl float-gentle" style={{ animationDelay: `${index * 0.3}s` }}>
              {product.emoji}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-playful font-semibold text-foreground mb-2 leading-tight">
              {product.name}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-3">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < product.rating ? 'text-accent fill-current' : 'text-muted'}`} 
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1 font-body">
                ({product.rating}/5)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-playful font-bold text-lg text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-gradient-bloom font-playful hover:scale-105 transition-transform cartoon-shadow"
              size="sm"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;