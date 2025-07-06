import { useState } from "react";
import { Menu, X, Flower, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-sky sticky top-0 z-50 cartoon-shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link to="/" className="flex items-center space-x-2 bounce-in">
            <div className="relative">
              <Flower className="h-8 w-8 text-primary float-gentle" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-brand text-2xl md:text-3xl text-gradient-bloom">
                YD BLOOM
              </h1>
              <p className="font-playful text-xs text-muted-foreground -mt-1">
                growing with grace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/new-arrivals" className="font-playful text-foreground hover:text-primary transition-colors duration-300 hover:wiggle">
              New Arrivals
            </Link>
            <Link to="/boys" className="font-playful text-foreground hover:text-primary transition-colors duration-300 hover:wiggle">
              Boys
            </Link>
            <Link to="/girls" className="font-playful text-foreground hover:text-primary transition-colors duration-300 hover:wiggle">
              Girls
            </Link>
            <Link to="/collections" className="font-playful text-foreground hover:text-primary transition-colors duration-300 hover:wiggle">
              Sale
            </Link>
            <Link to="/about" className="font-playful text-foreground hover:text-primary transition-colors duration-300 hover:wiggle">
              About
            </Link>
            <Link to="/contact" className="font-playful text-foreground hover:text-primary transition-colors duration-300 hover:wiggle">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" className="playful-border font-playful relative">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart ({cartItemCount})
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="bg-gradient-bloom font-playful cartoon-shadow hover:scale-105 transition-transform">
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <Link to="/new-arrivals" className="font-playful text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                New Arrivals
              </Link>
              <Link to="/boys" className="font-playful text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Boys
              </Link>
              <Link to="/girls" className="font-playful text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Girls
              </Link>
              <Link to="/collections" className="font-playful text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sale
              </Link>
              <Link to="/about" className="font-playful text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="font-playful text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex space-x-2 pt-2">
                <Link to="/cart" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-playful">
                    Cart ({cartItemCount})
                  </Button>
                </Link>
                <Link to="/shop" className="flex-1">
                  <Button className="w-full bg-gradient-bloom font-playful" onClick={() => setIsMenuOpen(false)}>Shop</Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;