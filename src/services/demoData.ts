import { Product, ProductColor } from './productService';

// Demo admin credentials
export const DEMO_ADMIN = {
  email: 'admin@demo.com',
  password: 'demo123'
};

// Helper function to create color objects
const createColor = (name: string, mainImage: string, additionalImages: string[] = []): ProductColor => ({
  name,
  images: [mainImage, ...additionalImages].slice(0, 4), // Limit to 4 images
  inStock: true
});

// Demo products for testing
export const DEMO_PRODUCTS: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "Adventure Boy T-Shirt",
    price: 25.99,
    originalPrice: 35.99,
    mainImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    emoji: "👕",
    description: "Comfortable cotton t-shirt perfect for active boys. Features fun adventure-themed design.",
    rating: 5,
    category: "boys",
    colors: [
      createColor("Blue", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&brightness=0.8",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&brightness=1.2"
      ]),
      createColor("Red", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=0", [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=0&brightness=0.8"
      ]),
      createColor("Green", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=120", [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&hue=120&brightness=0.8"
      ])
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
    isNew: false,
    isPopular: true
  },
  {
    name: "Princess Dress",
    price: 45.99,
    originalPrice: 55.99,
    mainImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    emoji: "👗",
    description: "Beautiful princess dress with sparkly details. Perfect for special occasions.",
    rating: 5,
    category: "girls",
    colors: [
      createColor("Pink", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&brightness=0.9",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&brightness=1.1"
      ]),
      createColor("Purple", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&hue=270", [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&hue=270&brightness=0.9"
      ]),
      createColor("White", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&brightness=1.5", [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&brightness=1.5&saturation=0.8"
      ])
    ],
    sizes: ["2T", "3T", "4T", "5T"],
    inStock: true,
    featured: true,
    isNew: true,
    isPopular: false
  },
  {
    name: "Summer Collection Hoodie",
    price: 39.99,
    mainImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    emoji: "🧥",
    description: "New summer collection hoodie with breathable fabric and trendy design.",
    rating: 4,
    category: "new-arrivals",
    colors: [
      createColor("Gray", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&brightness=0.8",
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&brightness=1.2"
      ]),
      createColor("Black", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&brightness=0.3", [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&brightness=0.3&saturation=0.8"
      ]),
      createColor("Navy", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&hue=240", [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&hue=240&brightness=0.8"
      ])
    ],
    sizes: ["S", "M", "L"],
    inStock: true,
    featured: false,
    isNew: true,
    isPopular: false
  },
  {
    name: "Sports Jersey",
    price: 32.99,
    mainImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    emoji: "⚽",
    description: "Lightweight sports jersey perfect for outdoor activities and sports.",
    rating: 4,
    category: "boys",
    colors: [
      createColor("Red", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&brightness=0.9",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&brightness=1.1"
      ]),
      createColor("Blue", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&hue=240", [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&hue=240&brightness=0.9"
      ]),
      createColor("White", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&brightness=1.5", [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&brightness=1.5&saturation=0.8"
      ])
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: false,
    isNew: false,
    isPopular: true
  },
  {
    name: "Floral Summer Dress",
    price: 38.99,
    originalPrice: 48.99,
    mainImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    emoji: "🌸",
    description: "Light and airy floral dress perfect for summer days. Made from soft cotton.",
    rating: 5,
    category: "girls",
    colors: [
      createColor("Yellow", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop", [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&brightness=0.9",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&brightness=1.1"
      ]),
      createColor("Pink", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&hue=330", [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&hue=330&brightness=0.9"
      ]),
      createColor("Blue", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&hue=240", [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&hue=240&brightness=0.9"
      ])
    ],
    sizes: ["2T", "3T", "4T", "5T"],
    inStock: true,
    featured: true,
    isNew: false,
    isPopular: true
  },
  {
    name: "Limited Edition Jacket",
    price: 65.99,
    mainImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    emoji: "🧥",
    description: "Limited edition jacket with premium materials and unique design.",
    rating: 5,
    category: "new-arrivals",
    colors: [
      createColor("Black", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&brightness=0.8",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&brightness=1.2"
      ]),
      createColor("Brown", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&hue=30", [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&hue=30&brightness=0.8"
      ])
    ],
    sizes: ["S", "M", "L"],
    inStock: false,
    featured: true,
    isNew: true,
    isPopular: false
  }
]; 