
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch product by id
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const product = mockProducts.find(p => p.id === id);
        if (product) {
          // Calculate distance if user has location
          if (user?.location) {
            const distance = calculateDistance(
              user.location.lat,
              user.location.lng,
              product.location.lat,
              product.location.lng
            );
            setProduct({ ...product, distance });
          } else {
            setProduct(product);
          }
        } else {
          toast.error('Product not found');
          navigate('/');
        }
      } catch (error) {
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate, user?.location]);

  const handleContactSeller = () => {
    // In a real app, this would open a chat or messaging interface
    toast.info(`Contact feature would connect you with ${product?.sellerName}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8 px-4">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-96 bg-muted rounded-lg mb-8"></div>
            <div className="h-8 bg-muted rounded-md w-1/2 mb-4"></div>
            <div className="h-6 bg-muted rounded-md w-1/4 mb-8"></div>
            <div className="h-32 bg-muted rounded-md mb-8"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) return null;

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={product.images[activeImageIndex] || product.images[0]} 
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        i === activeImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.title} - ${i + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-2xl font-bold text-primary mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{product.location.address}</span>
                  {product.distance !== undefined && (
                    <span className="ml-1">({product.distance.toFixed(1)} km away)</span>
                  )}
                </div>
              </div>

              <Separator />
              
              <div>
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-lg font-medium mb-2">Details</h2>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd>{product.category}</dd>
                  <dt className="text-muted-foreground">Listed On</dt>
                  <dd>{new Date(product.createdAt).toLocaleDateString()}</dd>
                </dl>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                      {/* Placeholder for seller avatar */}
                      <div className="bg-primary h-full w-full flex items-center justify-center text-lg font-bold text-white">
                        {product.sellerName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{product.sellerName}</p>
                      <p className="text-sm text-muted-foreground">Seller</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleContactSeller}
                  >
                    Contact Seller
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
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

export default ProductDetails;
