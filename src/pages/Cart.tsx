import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, redirectToWhatsApp, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
            
            <div className="space-y-4">
              <h1 className="font-brand text-4xl md:text-6xl text-gradient-bloom">
                Your Cart
              </h1>
              <div className="text-8xl mb-6">🛒</div>
              <p className="font-body text-lg text-muted-foreground">
                Your cart is empty! Let's find some magical outfits for your little ones.
              </p>
              <Link to="/shop">
                <Button className="bg-gradient-bloom font-playful mt-4">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
          
          <div className="space-y-4">
            <h1 className="font-brand text-4xl md:text-6xl text-gradient-bloom">
              Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Review your magical selections before placing your order.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="cartoon-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="font-playful font-semibold text-lg">{item.name}</h3>
                        <p className="font-body text-sm text-muted-foreground">{item.description}</p>
                        <p className="font-playful font-bold text-lg text-primary mt-1">{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-playful font-semibold w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="cartoon-shadow bg-gradient-sunshine">
                <CardContent className="p-6">
                  <h3 className="font-playful font-semibold text-xl mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="font-body">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                      <span className="font-playful font-semibold">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Shipping:</span>
                      <span>Calculated via WhatsApp</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-playful font-bold text-lg">
                      <span>Estimated Total:</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={redirectToWhatsApp}
                    className="w-full bg-gradient-bloom font-playful mb-3"
                    size="lg"
                  >
                    Order via WhatsApp
                  </Button>
                  
                  <Button 
                    onClick={clearCart}
                    variant="outline"
                    className="w-full font-playful"
                    size="sm"
                  >
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>

              <Card className="cartoon-shadow">
                <CardContent className="p-6">
                  <h4 className="font-playful font-semibold mb-2">How it works:</h4>
                  <ol className="text-sm space-y-1 font-body text-muted-foreground">
                    <li>1. Click "Order via WhatsApp"</li>
                    <li>2. We'll calculate exact shipping</li>
                    <li>3. Choose your payment method</li>
                    <li>4. We'll ship your magical items!</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Cart;
