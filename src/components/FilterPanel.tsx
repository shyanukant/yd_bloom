import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
  filters: {
    category?: FilterOption[];
    stock?: FilterOption[];
    featured?: FilterOption[];
    date?: FilterOption[];
  };
  values: {
    category: string;
    stock: string;
    featured: string;
    date: string;
  };
  onChange: (filterType: string, value: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  values,
  onChange,
  onClear,
  isOpen,
  onToggle,
  className = ""
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          onClick={onToggle}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        {Object.values(values).some(v => v !== 'all') && (
          <Button 
            variant="ghost" 
            onClick={onClear}
            className="flex items-center gap-2 text-sm"
          >
            <X className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          {filters.category && (
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={values.category} onValueChange={(value) => onChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filters.category.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {filters.stock && (
            <div>
              <label className="text-sm font-medium mb-2 block">Stock</label>
              <Select value={values.stock} onValueChange={(value) => onChange('stock', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filters.stock.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {filters.featured && (
            <div>
              <label className="text-sm font-medium mb-2 block">Featured</label>
              <Select value={values.featured} onValueChange={(value) => onChange('featured', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filters.featured.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {filters.date && (
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Select value={values.date} onValueChange={(value) => onChange('date', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filters.date.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 