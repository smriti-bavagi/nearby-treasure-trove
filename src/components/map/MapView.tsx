
import React, { useEffect, useState, useRef } from 'react';
import { Product } from '@/types';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// This is a placeholder component for the map view
// In a real application, this would be integrated with a maps library like Google Maps or Mapbox
const MapView: React.FC = () => {
  const { filteredProducts, setActiveProduct, setIsMapView } = useProducts();
  const { user } = useAuth();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isPseudoRendered, setIsPseudoRendered] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsPseudoRendered(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setIsMapView(false);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] bg-muted rounded-lg overflow-hidden">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-30">
        <Button 
          variant="secondary" 
          size="sm" 
          className="flex items-center gap-1 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to list</span>
        </Button>
      </div>

      {!isPseudoRendered ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="relative h-full" ref={mapRef}>
          {/* Fake map background */}
          <div className="absolute inset-0 bg-[#f2f2f2] opacity-80"></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
          </div>
          
          {/* Sample roads */}
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-0 bottom-0 w-3 bg-gray-200 rounded-full"></div>
            <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-gray-200 rounded-full"></div>
            <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
            <div className="absolute top-2/3 left-0 right-0 h-3 bg-gray-200 rounded-full"></div>
          </div>

          {/* User location marker */}
          {user?.location && (
            <div 
              className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              <span className="absolute inset-0 bg-primary opacity-20 rounded-full animate-ping"></span>
              <span className="absolute inset-1 bg-white rounded-full"></span>
            </div>
          )}

          {/* Product markers */}
          {filteredProducts.map((product) => (
            <ProductMarker
              key={product.id}
              product={product}
              onClick={() => setActiveProduct(product)}
            />
          ))}
        </div>
      )}
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm py-2 mx-auto max-w-xs rounded-full">
        This is a simulation. Connect your favorite map API for real functionality.
      </div>
    </div>
  );
};

interface ProductMarkerProps {
  product: Product;
  onClick: () => void;
}

const ProductMarker: React.FC<ProductMarkerProps> = ({ product, onClick }) => {
  // Randomly position markers across the map for demo
  const left = `${Math.floor(Math.random() * 80) + 10}%`;
  const top = `${Math.floor(Math.random() * 80) + 10}%`;

  return (
    <button
      onClick={onClick}
      className="absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 group z-10"
      style={{ left, top }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-0.5 rounded-full shadow-md group-hover:scale-110 transition-transform">
          <div 
            className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-white"
            style={{ backgroundImage: `url(${product.images[0]})` }}
          ></div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 mx-auto w-0 h-0 
                      border-l-[6px] border-l-transparent 
                      border-t-[6px] border-t-white
                      border-r-[6px] border-r-transparent"></div>
      </div>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-background shadow-lg rounded-md px-2 py-1 w-max opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-xs font-medium">${product.price}</p>
      </div>
    </button>
  );
};

export default MapView;
