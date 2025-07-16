import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/services/productService";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await getProducts();
        // Show featured products first, then a mix of other products
        const featuredProducts = allProducts.filter(p => p.featured);
        const otherProducts = allProducts.filter(p => !p.featured);
        const previewProducts = [
          ...featuredProducts.slice(0, 4),
          ...otherProducts.slice(0, 4)
        ].slice(0, 8); // Show max 8 products
        setProducts(previewProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

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
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👕</div>
            <p className="font-body text-lg text-muted-foreground">
              No products available at the moment.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button 
              size="lg" 
              variant="outline" 
              className="playful-border font-playful px-8 hover:bg-gradient-sunshine hover:scale-105 transition-all"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;