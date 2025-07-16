import { Product as FirebaseProduct } from '@/services/productService';

// Define CartProduct interface locally since CartContext doesn't export it
interface CartProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  emoji: string;
  description: string;
  rating: number;
  category: 'boys' | 'girls' | 'unisex';
  isNew?: boolean;
  isPopular?: boolean;
  realImage?: string;
  additionalImages?: string[];
}

// Convert Firebase Product to Cart Product format
export const adaptFirebaseProductToCart = (firebaseProduct: FirebaseProduct): CartProduct => {
  // Map Firebase category to Cart category
  const mapCategory = (category: string): 'boys' | 'girls' | 'unisex' => {
    switch (category) {
      case 'boys':
        return 'boys';
      case 'girls':
        return 'girls';
      case 'new-arrivals':
        return 'unisex'; // Map new-arrivals to unisex for cart compatibility
      default:
        return 'unisex';
    }
  };

  // Get the first color's first image as the main image
  const mainImage = firebaseProduct.colors && firebaseProduct.colors.length > 0 
    ? firebaseProduct.colors[0].images[0] 
    : firebaseProduct.mainImage;

  // Get additional images from the first color
  const additionalImages = firebaseProduct.colors && firebaseProduct.colors.length > 0 
    ? firebaseProduct.colors[0].images.slice(1) 
    : [];

  return {
    id: parseInt(firebaseProduct.id || '0'),
    name: firebaseProduct.name,
    price: `$${firebaseProduct.price}`,
    originalPrice: firebaseProduct.originalPrice ? `$${firebaseProduct.originalPrice}` : undefined,
    image: firebaseProduct.emoji || '👕', // Use emoji as image
    emoji: firebaseProduct.emoji || '👕',
    description: firebaseProduct.description || '',
    rating: firebaseProduct.rating || 5,
    category: mapCategory(firebaseProduct.category),
    isNew: firebaseProduct.isNew || firebaseProduct.category === 'new-arrivals',
    isPopular: firebaseProduct.isPopular || firebaseProduct.featured || false,
    realImage: mainImage,
    additionalImages: additionalImages
  };
};

// Convert Cart Product to Firebase Product format
export const adaptCartProductToFirebase = (cartProduct: CartProduct): Omit<FirebaseProduct, 'id' | 'createdAt' | 'updatedAt'> => {
  // Map Cart category to Firebase category
  const mapCategory = (category: string): 'boys' | 'girls' | 'unisex' | 'new-arrivals' => {
    switch (category) {
      case 'boys':
        return 'boys';
      case 'girls':
        return 'girls';
      case 'unisex':
        return 'new-arrivals'; // Map unisex to new-arrivals for Firebase
      default:
        return 'new-arrivals';
    }
  };

  // Create a default color with the product images
  const defaultColor = {
    name: "Default",
    images: [cartProduct.realImage, ...(cartProduct.additionalImages || [])].slice(0, 4),
    inStock: true
  };

  return {
    name: cartProduct.name,
    price: parseFloat(cartProduct.price.replace('$', '')),
    originalPrice: cartProduct.originalPrice ? parseFloat(cartProduct.originalPrice.replace('$', '')) : undefined,
    mainImage: cartProduct.realImage,
    emoji: cartProduct.emoji || '👕',
    description: cartProduct.description,
    rating: cartProduct.rating || 5,
    category: mapCategory(cartProduct.category),
    colors: [defaultColor],
    sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T", "6T", "7T", "8T", "9T", "10T"], // Age-appropriate sizes for children
    inStock: true,
    featured: cartProduct.isPopular || false,
    isNew: cartProduct.isNew || false,
    isPopular: cartProduct.isPopular || false
  };
}; 