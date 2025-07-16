import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/services/productService';

interface AdminProductFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  editingProduct: Product | null;
  formData: {
    name: string;
    price: string;
    originalPrice: string;
    description: string;
    emoji: string;
    rating: number;
    category: 'boys' | 'girls' | 'unisex' | 'new-arrivals';
    sizes: string;
    inStock: boolean;
    featured: boolean;
    isNew: boolean;
    isPopular: boolean;
  };
  onFormDataChange: (data: any) => void;
  colors: Array<{
    name: string;
    images: string[];
    inStock: boolean;
  }>;
  onColorsChange: (colors: Array<{
    name: string;
    images: string[];
    inStock: boolean;
  }>) => void;
  imageFile: File | null;
  imagePreview: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  editingProduct,
  formData,
  onFormDataChange,
  colors,
  onColorsChange,
  imageFile,
  imagePreview,
  onImageChange,
  onReset
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onReset}>Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => onFormDataChange({ ...formData, category: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boys">Boys</SelectItem>
                  <SelectItem value="girls">Girls</SelectItem>
                  <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => onFormDataChange({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price (Optional)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => onFormDataChange({ ...formData, originalPrice: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                value={formData.emoji}
                onChange={(e) => onFormDataChange({ ...formData, emoji: e.target.value })}
                placeholder="🌈"
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => onFormDataChange({ ...formData, rating: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sizes">Sizes (comma separated)</Label>
              <Input
                id="sizes"
                value={formData.sizes}
                onChange={(e) => onFormDataChange({ ...formData, sizes: e.target.value })}
                placeholder="S, M, L, XL"
              />
            </div>
          </div>

          {/* Colors Section */}
          <div>
            <Label>Colors</Label>
            {colors.map((color, colorIdx) => (
              <div key={colorIdx} className="border rounded p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    placeholder="Color name (e.g. Red)"
                    value={color.name}
                    onChange={e => {
                      const newColors = [...colors];
                      newColors[colorIdx].name = e.target.value;
                      onColorsChange(newColors);
                    }}
                    className="w-32"
                  />
                  <input
                    type="checkbox"
                    checked={color.inStock}
                    onChange={e => {
                      const newColors = [...colors];
                      newColors[colorIdx].inStock = e.target.checked;
                      onColorsChange(newColors);
                    }}
                  />
                  <Label>In Stock</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const newColors = colors.filter((_, idx) => idx !== colorIdx);
                      onColorsChange(newColors);
                    }}
                  >
                    Remove Color
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {color.images.map((img, imgIdx) => (
                    <div key={imgIdx} className="relative">
                      <img src={img} alt="Color preview" className="w-20 h-20 object-cover rounded" />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute top-0 right-0"
                        onClick={() => {
                          const newColors = [...colors];
                          newColors[colorIdx].images = newColors[colorIdx].images.filter((_, i) => i !== imgIdx);
                          onColorsChange(newColors);
                        }}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                  {color.images.length < 4 && (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = ev => {
                          const newColors = [...colors];
                          newColors[colorIdx].images = [...newColors[colorIdx].images, ev.target?.result as string];
                          onColorsChange(newColors);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => onColorsChange([...colors, { name: '', images: [], inStock: true }])}
            >
              Add Color
            </Button>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                onReset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductForm; 