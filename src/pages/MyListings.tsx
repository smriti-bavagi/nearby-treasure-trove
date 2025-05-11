
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';

const MyListings: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Filter products by user ID
  const userListings = React.useMemo(() => {
    if (!user) return [];
    return mockProducts.filter(product => product.sellerId === user.id);
  }, [user]);

  const handleAddListing = () => {
    navigate('/create-listing');
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Button onClick={handleAddListing}>
            Create New Listing
          </Button>
        </div>
        
        {userListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userListings.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-2">You haven't created any listings yet</h2>
            <p className="text-muted-foreground mb-6">
              Sell your items to people in your local area
            </p>
            <Button onClick={handleAddListing}>
              Create Your First Listing
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyListings;
