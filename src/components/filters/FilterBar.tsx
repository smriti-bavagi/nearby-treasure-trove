
import React from 'react';
import { Category } from '@/types';
import { useProducts } from '@/contexts/ProductContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Map, Filter } from 'lucide-react';
import { categories } from '@/data/mockData';

interface FilterBarProps {
  onToggleMapView: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onToggleMapView }) => {
  const { 
    filterOptions, 
    setFilterOptions,
    isMapView
  } = useProducts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFilterOptions({ 
      category: value === 'All' ? 'All' : value as Category 
    });
  };

  const handleDistanceChange = (value: number[]) => {
    setFilterOptions({ distance: value[0] });
  };

  return (
    <div className="sticky top-16 z-30 bg-white border-b py-3 px-4">
      <div className="container flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={filterOptions.searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Button 
            variant={isMapView ? "default" : "outline"} 
            size="icon"
            onClick={onToggleMapView}
            title={isMapView ? "Show list view" : "Show map view"}
          >
            <Map className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => document.getElementById('filter-drawer')?.classList.toggle('hidden')}
            title="Filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div id="filter-drawer" className="hidden lg:flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-40">
              <Select value={filterOptions.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 w-48">
              <span className="text-sm whitespace-nowrap">Distance: {filterOptions.distance} km</span>
              <Slider
                value={[filterOptions.distance]}
                max={50}
                min={1}
                step={1}
                onValueChange={handleDistanceChange}
              />
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{filterOptions.category === 'All' ? 'All categories' : filterOptions.category}</span>
            {filterOptions.searchTerm && (
              <span className="ml-2">• Search: "{filterOptions.searchTerm}"</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
