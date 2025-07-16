import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import { isDemoMode, getEnvironmentInfo } from '@/config/environment';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  deleteImage,
  Product
} from '@/services/productService';
import { Edit, Trash2, Settings } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import AdminProductForm from '@/components/AdminProductForm';
import EmailSettings from '@/components/EmailSettings';
import { getAuth } from 'firebase/auth';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Admin panel tabs
  const [activeTab, setActiveTab] = useState<'products' | 'email'>('products');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    emoji: '',
    rating: 5,
    category: 'boys' as 'boys' | 'girls' | 'unisex' | 'new-arrivals',
    sizes: '',
    inStock: true,
    featured: false,
    isNew: false,
    isPopular: false
  });

  const [colors, setColors] = useState<Array<{
    name: string;
    images: string[];
    inStock: boolean;
  }>>([]);

  const { toast } = useToast();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load products when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const loadProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await authService.signIn(email, password);
      if (result.success) {
        toast({
          title: "Success",
          description: "Logged in successfully"
        });
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast({
        title: "Success",
        description: "Logged out successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive"
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      description: '',
      emoji: '',
      rating: 5,
      category: 'boys',
      sizes: '',
      inStock: true,
      featured: false,
      isNew: false,
      isPopular: false
    });
    setColors([]);
    setImageFile(null);
    setImagePreview('');
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let mainImage = editingProduct?.mainImage || '';

      if (imageFile) {
        mainImage = await uploadImage(imageFile);
      }

      const { price, originalPrice, sizes, ...restFormData } = formData;
      const productData = {
        ...restFormData,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        sizes: sizes.split(',').map(s => s.trim()).filter(s => s.length > 0),
        mainImage,
        colors,
        createdAt: editingProduct?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast({
          title: "Success",
          description: "Product updated successfully"
        });
      } else {
        await addProduct(productData);
        toast({
          title: "Success",
          description: "Product added successfully"
        });
      }

      setIsDialogOpen(false);
      resetForm();
      loadProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      description: product.description,
      emoji: product.emoji,
      rating: product.rating,
      category: product.category,
      sizes: product.sizes.join(', '),
      inStock: product.inStock,
      featured: product.featured,
      isNew: product.isNew,
      isPopular: product.isPopular
    });
    setColors(product.colors || []);
    setImagePreview(product.mainImage);
    setIsDialogOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id);
        toast({
          title: "Success",
          description: "Product deleted successfully"
        });
        loadProducts();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive"
        });
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStockFilter('all');
    setFeaturedFilter('all');
    setDateFilter('all');
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'new-arrivals'
        ? product.category === 'new-arrivals' || product.isNew
        : product.category === categoryFilter);
    const matchesStock = stockFilter === 'all' ||
      (stockFilter === 'in-stock' && product.inStock) ||
      (stockFilter === 'out-of-stock' && !product.inStock);
    const matchesFeatured = featuredFilter === 'all' ||
      (featuredFilter === 'featured' && product.featured) ||
      (featuredFilter === 'not-featured' && !product.featured);

    return matchesSearch && matchesCategory && matchesStock && matchesFeatured;
  });

  // --- Dashboard Summary ---
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, p) => sum + (p.colors?.reduce((cSum, c) => c.inStock ? cSum + 1 : cSum, 0) || 0), 0);
  const outOfStockProducts = products.filter(p => !(p.colors?.some(c => c.inStock))).length;

  // --- Table Helper ---
  const getFirstImage = (product: Product) => {
    if (product.colors && product.colors.length > 0 && product.colors[0].images.length > 0) {
      return product.colors[0].images[0];
    }
    return product.mainImage || '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>
              {isDemoMode() && (
                <div className="p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="font-semibold mb-1">Demo Credentials:</p>
                  <p>Email: admin@demo.com</p>
                  <p>Password: demo123</p>
                </div>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalInventory}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Out of Stock Products</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowChangePassword(true)}>
              Change Password
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{outOfStockProducts}</div>
          </CardContent>
        </Card>
      </div>
      {/* Search and Filter */}
      <div className="space-y-4 mb-6">
        <SearchBar
          placeholder="Search products by name, description, or category..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="max-w-md"
        />
        <FilterPanel
          filters={{
            category: [
              { value: 'all', label: 'All Categories' },
              { value: 'boys', label: 'Boys' },
              { value: 'girls', label: 'Girls' },
              { value: 'new-arrivals', label: 'New Arrivals' }
            ],
            stock: [
              { value: 'all', label: 'All Stock' },
              { value: 'in-stock', label: 'In Stock' },
              { value: 'out-of-stock', label: 'Out of Stock' }
            ],
            featured: [
              { value: 'all', label: 'All' },
              { value: 'featured', label: 'Featured' },
              { value: 'not-featured', label: 'Not Featured' }
            ]
          }}
          values={{
            category: categoryFilter,
            stock: stockFilter,
            featured: featuredFilter,
            date: dateFilter
          }}
          onChange={(filterType, value) => {
            switch (filterType) {
              case 'category':
                setCategoryFilter(value);
                break;
              case 'stock':
                setStockFilter(value);
                break;
              case 'featured':
                setFeaturedFilter(value);
                break;
              case 'date':
                setDateFilter(value);
                break;
            }
          }}
          onClear={clearFilters}
          isOpen={showFilters}
          onToggle={() => setShowFilters(!showFilters)}
        />
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto bg-card rounded-lg shadow p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Colors</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b last:border-b-0">
                <td className="p-3">
                  <img src={getFirstImage(product)} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">
                  {product.colors?.some(c => c.inStock) ? (
                    <Badge variant="default">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-1 flex-wrap">
                    {product.colors?.map((color, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 rounded bg-muted text-xs border mr-1 mb-1">
                        {color.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(product)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(product)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Form Dialog */}
      <div className="mt-8">
        <AdminProductForm
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          editingProduct={editingProduct}
          formData={formData}
          onFormDataChange={setFormData}
          colors={colors}
          onColorsChange={setColors}
          imageFile={imageFile}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onReset={resetForm}
        />
      </div>
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value;
                const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
                const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
                if (newPassword !== confirmPassword) {
                  toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
                  return;
                }
                try {
                  const user = authService.getCurrentUser();
                  if (!user || !user.email) throw new Error('No user');
                  await authService.reauthenticate(user.email, currentPassword);
                  await authService.updatePassword(newPassword);
                  toast({ title: 'Success', description: 'Password updated successfully' });
                  setShowChangePassword(false);
                } catch (err: any) {
                  toast({ title: 'Error', description: err.message || 'Failed to update password', variant: 'destructive' });
                }
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" name="currentPassword" type="password" required />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" name="newPassword" type="password" required />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Update</Button>
                <Button type="button" variant="outline" onClick={() => setShowChangePassword(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 