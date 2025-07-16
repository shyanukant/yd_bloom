import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/services/productService";

import { useSearchParams } from "react-router-dom";

const Shop = () => {
  const [filter, setFilter] = useState<'all' | 'boys' | 'girls' | 'new-arrivals' | 'featured'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products = [], isLoading, error } = useProducts();

  // Handle search from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product: Product) => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    let matchesCategory = true;
    switch (filter) {
      case 'boys':
        matchesCategory = product.category === 'boys';
        break;
      case 'girls':
        matchesCategory = product.category === 'girls';
        break;
      case 'new-arrivals':
        matchesCategory = product.isNew || false;
        break;
      case 'featured':
        matchesCategory = product.featured || false;
        break;
      default:
        matchesCategory = true;
    }
    
    return matchesSearch && matchesCategory;
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

          {/* Search Results Display */}
          {searchTerm && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">
                Search results for: <strong>"{searchTerm}"</strong>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSearchParams({});
                }}
                className="text-blue-700 hover:text-blue-900"
              >
                ✕
              </Button>
            </div>
          )}

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
              Boys ({products.filter((p: Product) => p.category === 'boys').length})
            </Button>
            <Button
              variant={filter === 'girls' ? 'default' : 'outline'}
              onClick={() => setFilter('girls')}
              className="font-playful"
            >
              Girls ({products.filter((p: Product) => p.category === 'girls').length})
            </Button>
            <Button
              variant={filter === 'new-arrivals' ? 'default' : 'outline'}
              onClick={() => setFilter('new-arrivals')}
              className="font-playful"
            >
              New Arrivals ({products.filter((p: Product) => p.isNew).length})
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilter('featured')}
              className="font-playful"
            >
              Featured ({products.filter((p: Product) => p.featured).length})
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⏳</div>
              <p className="font-body text-lg text-muted-foreground">
                Loading products...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">❌</div>
              <p className="font-body text-lg text-muted-foreground">
                Failed to load products. Please try again later.
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                />
              ))}
            </div>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
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