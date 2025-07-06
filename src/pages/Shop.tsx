import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const Shop = () => {
  const [filter, setFilter] = useState<'all' | 'boys' | 'girls' | 'new' | 'popular'>('all');

  const filteredProducts = products.filter(product => {
    switch (filter) {
      case 'boys':
        return product.category === 'boys' || product.category === 'unisex';
      case 'girls':
        return product.category === 'girls' || product.category === 'unisex';
      case 'new':
        return product.isNew;
      case 'popular':
        return product.isPopular;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="space-y-4">
            <h1 className="font-brand text-4xl md:text-6xl text-gradient-bloom">
              Shop All Products
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Discover our complete collection of magical children's clothing. 
              Every piece is crafted with love and designed for comfort and style.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="font-playful"
            >
              All ({products.length})
            </Button>
            <Button
              variant={filter === 'boys' ? 'default' : 'outline'}
              onClick={() => setFilter('boys')}
              className="font-playful"
            >
              Boys ({products.filter(p => p.category === 'boys' || p.category === 'unisex').length})
            </Button>
            <Button
              variant={filter === 'girls' ? 'default' : 'outline'}
              onClick={() => setFilter('girls')}
              className="font-playful"
            >
              Girls ({products.filter(p => p.category === 'girls' || p.category === 'unisex').length})
            </Button>
            <Button
              variant={filter === 'new' ? 'default' : 'outline'}
              onClick={() => setFilter('new')}
              className="font-playful"
            >
              New ({products.filter(p => p.isNew).length})
            </Button>
            <Button
              variant={filter === 'popular' ? 'default' : 'outline'}
              onClick={() => setFilter('popular')}
              className="font-playful"
            >
              Popular ({products.filter(p => p.isPopular).length})
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="font-body text-lg text-muted-foreground">
                No products found for this filter. Try selecting a different category!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
      <FAQChatbot />
    </div>
  );
};

export default Shop;