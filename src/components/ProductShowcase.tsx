import { Star } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 bounce-in">
          <h2 className="font-brand text-4xl md:text-5xl text-gradient-bloom mb-4">
            Our Little Stars Collection
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked favorites that make every day a fashion adventure! 
            Each piece tells a story and sparks imagination.
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <Star className="h-4 w-4 text-accent float-gentle" />
            <div className="w-16 h-1 bg-gradient-bloom rounded-full"></div>
            <Star className="h-4 w-4 text-secondary float-gentle" style={{ animationDelay: '0.5s' }} />
            <div className="w-16 h-1 bg-gradient-bloom rounded-full"></div>
            <Star className="h-4 w-4 text-accent float-gentle" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button 
              size="lg" 
              variant="outline" 
              className="playful-border font-playful px-8 hover:bg-gradient-sunshine hover:scale-105 transition-all"
            >
              View All {products.length} Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;