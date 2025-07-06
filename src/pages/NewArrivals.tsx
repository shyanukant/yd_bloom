import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import FAQChatbot from "@/components/FAQChatbot";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const NewArrivals = () => {
  const newProducts = products.filter(product => product.isNew);

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
              New Arrivals
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">
              Fresh styles just landed! Discover the latest additions to our magical 
              collection of children's clothing.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {newProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✨</div>
              <p className="font-body text-lg text-muted-foreground">
                New magical pieces are coming soon! Check back for fresh arrivals.
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

export default NewArrivals;