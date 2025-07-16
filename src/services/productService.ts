import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';
import { products as existingProducts } from '../data/products';
import { isDemoMode } from '@/config/environment';

export interface ProductColor {
  name: string;
  images: string[];
  inStock: boolean;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  realImage?: string; // For backward compatibility
  emoji: string;
  description: string;
  rating: number;
  category: 'boys' | 'girls' | 'unisex' | 'new-arrivals';
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

// Local state for demo products (will be replaced with actual products)
let demoProducts: Product[] = [];

// Initialize demo products from the existing products data
const initializeDemoProducts = () => {
  demoProducts = existingProducts.map((product, index) => {
    // Convert price from string to number
    const price = parseFloat(product.price.replace('$', ''));
    const originalPrice = product.originalPrice ? parseFloat(product.originalPrice.replace('$', '')) : undefined;
    
    // Create colors array with the main image and additional images
    const colors = [
      {
        name: "Default",
        images: [
          product.realImage,
          ...(product.additionalImages || [])
        ].slice(0, 4), // Limit to 4 images per color
        inStock: true
      }
    ];

    return {
      id: `demo-${product.id}`,
      name: product.name,
      price: price,
      originalPrice: originalPrice,
      mainImage: product.realImage,
      realImage: product.realImage, // For backward compatibility
      emoji: product.emoji,
      description: product.description,
      rating: product.rating,
      category: product.category as 'boys' | 'girls' | 'unisex' | 'new-arrivals',
      colors: colors,
      sizes: ["6M", "12M", "18M", "2T", "3T", "4T", "5T", "6T", "7T", "8T", "9T", "10T"], // Age-appropriate sizes for children
      inStock: true,
      featured: product.isNew || product.isPopular || false,
      isNew: product.isNew || false,
      isPopular: product.isPopular || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });
};

// Initialize demo products
initializeDemoProducts();

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    // Use demo products in demo mode
    if (isDemoMode()) {
      return demoProducts;
    }
    
    // Use Firebase in production mode
    if (!db) {
      console.warn('Firebase not configured, falling back to demo products');
      return demoProducts;
    }
    
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return demoProducts;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // Use demo products in demo mode
    if (isDemoMode()) {
      return demoProducts.find(p => p.id === id) || null;
    }
    
    // Use Firebase in production mode
    if (!db) {
      console.warn('Firebase not configured, falling back to demo products');
      return demoProducts.find(p => p.id === id) || null;
    }
    
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Add new product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // Use demo mode
    if (isDemoMode()) {
      const newId = `demo-${Date.now()}`;
      const newProduct: Product = {
        ...product,
        id: newId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      demoProducts.unshift(newProduct);
      console.log('Demo: Product added successfully', { id: newId, product });
      return newId;
    }
    
    // Use Firebase in production mode
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    // Use demo mode
    if (isDemoMode()) {
      const index = demoProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        demoProducts[index] = {
          ...demoProducts[index],
          ...product,
          updatedAt: new Date()
        };
        console.log('Demo: Product updated successfully', { id, product });
      }
      return;
    }
    
    // Use Firebase in production mode
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    // Use demo mode
    if (isDemoMode()) {
      demoProducts = demoProducts.filter(p => p.id !== id);
      console.log('Demo: Product deleted successfully', { id });
      return;
    }
    
    // Use Firebase in production mode
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Use demo mode
    if (isDemoMode()) {
      return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop';
    }
    
    // Use Firebase in production mode
    if (!storage) {
      throw new Error('Firebase Storage not configured');
    }
    
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Delete image from Firebase Storage
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Use demo mode
    if (isDemoMode()) {
      console.log('Demo: Image deleted successfully', { imageUrl });
      return;
    }
    
    // Use Firebase in production mode
    if (!storage) {
      throw new Error('Firebase Storage not configured');
    }
    
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}; 