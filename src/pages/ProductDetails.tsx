import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, Star, Plus, Minus, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react";
import { getProductById, Product } from "@/services/productService";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("3T");
  const [selectedColor, setSelectedColor] = useState("Default");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Use images from the product data
  const productImages = product.colors && product.colors.length > 0 
    ? product.colors[0].images 
    : [product.mainImage];

  const sizes = product.sizes || ["6M", "12M", "18M", "2T", "3T", "4T", "5T", "6T", "7T", "8T", "9T", "10T"];
  const colors = product.colors?.map(c => c.name) || ["Default"];

  const reviews = [
    { name: "Sarah M.", rating: 5, comment: "Absolutely adorable! My daughter loves it and the quality is amazing." },
    { name: "Mike D.", rating: 5, comment: "Perfect fit and super soft material. Highly recommend!" },
    { name: "Lisa K.", rating: 4, comment: "Beautiful design, colors are vibrant. Shipping was fast too." }
  ];

  const handleAddToCart = () => {
    const cartProduct = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast.success(`Added ${quantity} item(s) to cart!`);
    
    // Redirect to WhatsApp
    const phoneNumber = "+971545314090";
    const message = `Hi! I'm interested in this product from YD Bloom:

${product.name}
Price: $${product.price}
Size: ${selectedSize}
Color: ${selectedColor}
Quantity: ${quantity}
Description: ${product.description}

Can you help me with ordering and shipping details?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden cartoon-shadow">
              <img 
                src={productImages[selectedImage] || product.mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="font-brand text-3xl md:text-4xl text-gradient-bloom mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    {product.isNew && <Badge className="bg-accent text-accent-foreground">New!</Badge>}
                    {product.isPopular && <Badge className="bg-secondary text-secondary-foreground">Popular</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2"
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.rating}/5) • 127 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-brand text-3xl text-foreground">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive" className="text-xs">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-muted-foreground text-lg">
              {product.description}. Made with premium organic cotton, this piece combines comfort with style. Perfect for playtime, special occasions, or everyday adventures!
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-playful font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="font-playful"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-playful font-semibold mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="font-playful"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-playful font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-playful text-lg font-semibold px-4">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-bloom font-playful text-lg py-6 hover:scale-105 transition-transform cartoon-shadow"
                size="lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart - ${product.price.toFixed(2)}
              </Button>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  <span>Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description" className="font-playful">Description</TabsTrigger>
              <TabsTrigger value="size-guide" className="font-playful">Size Guide</TabsTrigger>
              <TabsTrigger value="reviews" className="font-playful">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playful">Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-body text-muted-foreground">
                    This adorable {product.name.toLowerCase()} is crafted with love and attention to detail. 
                    Made from 100% organic cotton, it's soft, breathable, and perfect for sensitive skin.
                  </p>
                  <ul className="space-y-2 font-body text-muted-foreground">
                    <li>• 100% Organic Cotton</li>
                    <li>• Machine washable</li>
                    <li>• Fade-resistant colors</li>
                    <li>• Reinforced seams for durability</li>
                    <li>• OEKO-TEX certified</li>
                    <li>• Designed for active play</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="size-guide" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playful">Size Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left font-playful">Size</th>
                          <th className="border border-border p-3 text-left font-playful">Age</th>
                          <th className="border border-border p-3 text-left font-playful">Height (cm)</th>
                          <th className="border border-border p-3 text-left font-playful">Weight (kg)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border p-3">6M</td><td className="border border-border p-3">0-6 months</td><td className="border border-border p-3">50-68</td><td className="border border-border p-3">3-8</td></tr>
                        <tr><td className="border border-border p-3">12M</td><td className="border border-border p-3">6-12 months</td><td className="border border-border p-3">68-80</td><td className="border border-border p-3">8-12</td></tr>
                        <tr><td className="border border-border p-3">18M</td><td className="border border-border p-3">12-18 months</td><td className="border border-border p-3">80-92</td><td className="border border-border p-3">12-15</td></tr>
                        <tr><td className="border border-border p-3">2T</td><td className="border border-border p-3">18-24 months</td><td className="border border-border p-3">92-98</td><td className="border border-border p-3">15-18</td></tr>
                        <tr><td className="border border-border p-3">3T</td><td className="border border-border p-3">2-3 years</td><td className="border border-border p-3">98-104</td><td className="border border-border p-3">18-21</td></tr>
                        <tr><td className="border border-border p-3">4T</td><td className="border border-border p-3">3-4 years</td><td className="border border-border p-3">104-110</td><td className="border border-border p-3">21-24</td></tr>
                        <tr><td className="border border-border p-3">5T</td><td className="border border-border p-3">4-5 years</td><td className="border border-border p-3">110-116</td><td className="border border-border p-3">24-27</td></tr>
                        <tr><td className="border border-border p-3">6T</td><td className="border border-border p-3">5-6 years</td><td className="border border-border p-3">110-116</td><td className="border border-border p-3">24-27</td></tr>
                        <tr><td className="border border-border p-3">7T</td><td className="border border-border p-3">6-7 years</td><td className="border border-border p-3">116-122</td><td className="border border-border p-3">27-30</td></tr>
                        <tr><td className="border border-border p-3">8T</td><td className="border border-border p-3">7-8 years</td><td className="border border-border p-3">122-128</td><td className="border border-border p-3">30-33</td></tr>
                        <tr><td className="border border-border p-3">9T</td><td className="border border-border p-3">8-9 years</td><td className="border border-border p-3">128-134</td><td className="border border-border p-3">33-36</td></tr>
                        <tr><td className="border border-border p-3">10T</td><td className="border border-border p-3">9-10 years</td><td className="border border-border p-3">134-140</td><td className="border border-border p-3">36-39</td></tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-playful">Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-playful font-semibold">{review.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-muted'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-body text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default ProductDetails;
