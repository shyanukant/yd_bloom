import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Boys = () => {
  const boysProducts = products.filter(product => 
    product.category === 'boys' || product.category === 'unisex'
  );

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
              Boys Collection
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Adventure-ready styles for young explorers. Comfortable, durable, 
              and designed for endless play and discovery.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {boysProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
      <FAQChatbot />
    </div>
  );
};

export default Boys;