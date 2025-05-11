
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import FilterBar from '@/components/filters/FilterBar';
import MapView from '@/components/map/MapView';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { MapPin, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import SellButton from '@/components/products/SellButton';

const Index: React.FC = () => {
  const { filteredProducts, isMapView, setIsMapView, setFilterOptions } = useProducts();
  const { user } = useAuth();
  
  const toggleMapView = () => {
    setIsMapView(!isMapView);
  };

  return (
    <Layout hideFooter={isMapView}>
      <FilterBar onToggleMapView={toggleMapView} />
      
      <div className="container px-4 pb-8">
        {!user?.location && (
          <div className="bg-muted/50 rounded-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 mt-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Set your location</h3>
                <p className="text-sm text-muted-foreground">
                  Add your location to see items near you and enable distance filtering
                </p>
              </div>
            </div>
            <Link to="/profile">
              <Button size="sm">Update Location</Button>
            </Link>
          </div>
        )}
        
        {isMapView ? (
          <div className="h-[calc(100vh-13rem)] mt-4">
            <MapView />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mt-6 mb-4">
              {filteredProducts.length === 0
                ? "No items found"
                : "Items for Sale"}
            </h1>
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
      
      {/* Floating sell button (visible on mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <SellButton className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center" size="icon">
          <Package className="h-6 w-6" />
        </SellButton>
      </div>
    </Layout>
  );
};

export default Index;
