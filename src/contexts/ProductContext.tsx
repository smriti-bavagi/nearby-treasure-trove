
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, FilterOptions } from '../types';
import { mockProducts } from '../data/mockData';
import { useAuth } from './AuthContext';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  activeProduct: Product | null;
  filterOptions: FilterOptions;
  isMapView: boolean;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
  setActiveProduct: (product: Product | null) => void;
  setIsMapView: (isMapView: boolean) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'sellerId' | 'sellerName'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: "All",
    distance: 50,
    searchTerm: "",
  });

  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...options
    }));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'sellerId' | 'sellerName'>) => {
    if (!user) return;
    
    const newProduct: Product = {
      ...productData,
      id: `prod${Date.now()}`,
      createdAt: new Date().toISOString(),
      sellerId: user.id,
      sellerName: user.name
    };
    
    setProducts(prev => [newProduct, ...prev]);
  };

  // Apply filters whenever they change or user location changes
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (filterOptions.category !== "All") {
      filtered = filtered.filter(
        product => product.category === filterOptions.category
      );
    }
    
    // Filter by search term
    if (filterOptions.searchTerm) {
      const searchLower = filterOptions.searchTerm.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate distance and filter by it if user has location
    if (user?.location) {
      filtered = filtered.map(product => {
        const distance = calculateDistance(
          user.location!.lat,
          user.location!.lng,
          product.location.lat,
          product.location.lng
        );
        return { ...product, distance };
      });
      
      // Filter by distance
      filtered = filtered.filter(
        product => (product.distance || 0) <= filterOptions.distance
      );
      
      // Sort by distance
      filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    
    setFilteredProducts(filtered);
  }, [products, filterOptions, user?.location]);

  const value: ProductContextType = {
    products,
    filteredProducts,
    activeProduct,
    filterOptions,
    isMapView,
    setFilterOptions: updateFilterOptions,
    setActiveProduct,
    setIsMapView,
    addProduct
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Haversine formula to calculate distance between two points in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
