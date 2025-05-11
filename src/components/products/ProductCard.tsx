
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, IndianRupee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, images, location, distance, category, currency } = product;
  
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md border-border">
        <div className="aspect-square w-full overflow-hidden relative bg-muted">
          <img 
            src={images[0]}
            alt={title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm py-1 px-2 rounded-full text-xs font-medium">
            {category}
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-base truncate">{title}</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="font-bold text-lg flex items-center">
              {currency === "INR" ? <IndianRupee className="h-4 w-4 mr-1" /> : "$"}
              {price.toFixed(2)}
            </p>
            <div className="text-xs text-muted-foreground flex items-center">
              <MapPin className="h-3 w-3 mr-0.5" />
              {distance !== undefined ? `${distance.toFixed(1)} km` : location.address.split(',')[0]}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
