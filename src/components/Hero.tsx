import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-100 via-pink-50 to-purple-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Mountains & Clouds */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-200/30 to-transparent"></div>
        <div className="absolute top-20 left-10 w-16 h-8 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-12 h-6 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-16 right-1/3 w-20 h-10 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
        
        {/* Adventure Path */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-300/50 via-orange-300/50 to-pink-300/50 rounded-t-lg hidden lg:block"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🌟</div>
        <div className="absolute bottom-1/3 left-1/6 text-2xl animate-bounce" style={{ animationDelay: '2.5s' }}>🦋</div>
      </div>

      {/* Main Content - Better Organization */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl text-gradient-bloom leading-tight">
                YD BLOOM
              </h1>
              <p className="font-playful text-xl md:text-2xl text-muted-foreground">
                Where Dreams Meet Style
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover magical children's clothing that grows with your little ones. 
              Every piece tells a story of adventure, comfort, and endless possibilities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button 
                  size="lg" 
                  className="bg-gradient-bloom font-playful text-lg px-8 py-4 cartoon-shadow hover:scale-105 transition-transform w-full sm:w-auto"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/collections">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-playful text-lg px-8 py-4 playful-border hover:scale-105 transition-transform w-full sm:w-auto"
                >
                  View Collections
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Made with Love</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Gift className="h-4 w-4 text-purple-500" />
                <span>Perfect Gifts</span>
              </div>
            </div>
          </div>

          {/* Right Column - Age Categories Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boys Category */}
            <Link to="/boys" className="group">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 text-center cartoon-shadow hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                <div className="text-4xl mb-4 group-hover:animate-bounce">👦</div>
                <h3 className="font-brand text-2xl text-blue-600 mb-2">Boys</h3>
                <p className="font-body text-sm text-blue-600/80 mb-4">
                  Adventure-ready styles for young explorers
                </p>
                <div className="bg-blue-200/50 rounded-full px-4 py-2 text-sm font-playful text-blue-700">
                  Explore Collection
                </div>
              </div>
            </Link>

            {/* Girls Category */}
            <Link to="/girls" className="group">
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-8 text-center cartoon-shadow hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                <div className="text-4xl mb-4 group-hover:animate-bounce">👧</div>
                <h3 className="font-brand text-2xl text-pink-600 mb-2">Girls</h3>
                <p className="font-body text-sm text-pink-600/80 mb-4">
                  Magical outfits for little princesses
                </p>
                <div className="bg-pink-200/50 rounded-full px-4 py-2 text-sm font-playful text-pink-700">
                  Explore Collection
                </div>
              </div>
            </Link>

            {/* New Arrivals */}
            <Link to="/new-arrivals" className="group md:col-span-2">
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-3xl p-8 text-center cartoon-shadow hover:scale-105 transition-all duration-300 group-hover:shadow-xl">
                <div className="text-4xl mb-4 group-hover:animate-pulse">✨</div>
                <h3 className="font-brand text-2xl text-purple-600 mb-2">New Arrivals</h3>
                <p className="font-body text-sm text-purple-600/80 mb-4">
                  Fresh styles just landed - discover what's new!
                </p>
                <div className="bg-purple-200/50 rounded-full px-6 py-2 text-sm font-playful text-purple-700 inline-block">
                  See What's New
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div> 
      
    </section>
  );
};

export default Hero;