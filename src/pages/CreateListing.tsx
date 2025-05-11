
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/contexts/ProductContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';

const DEFAULT_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
];

const CreateListing: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics' as Category,
    imageUrls: [''],
  });

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error('You need to be logged in to create a listing');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: Category) => {
    setFormState(prev => ({ ...prev, category: value }));
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...formState.imageUrls];
    newUrls[index] = value;
    setFormState(prev => ({ ...prev, imageUrls: newUrls }));
  };

  const handleAddImageField = () => {
    setFormState(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ''] }));
  };

  const handleRemoveImageField = (index: number) => {
    const newUrls = [...formState.imageUrls];
    newUrls.splice(index, 1);
    setFormState(prev => ({ ...prev, imageUrls: newUrls.length ? newUrls : [''] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.location) {
      toast.error('Please set your location first');
      return;
    }

    setIsLoading(true);
    
    // For demo purposes, if image URLs are empty, use default images
    const imageUrls = formState.imageUrls.filter(url => url.trim() !== '');
    const randomDefaultImage = DEFAULT_IMAGE_URLS[Math.floor(Math.random() * DEFAULT_IMAGE_URLS.length)];
    
    try {
      addProduct({
        title: formState.title,
        description: formState.description,
        price: parseFloat(formState.price),
        category: formState.category,
        images: imageUrls.length ? imageUrls : [randomDefaultImage],
        location: user.location
      });
      
      toast.success('Listing created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
            <CardDescription>
              Fill out the form to list your item for sale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    placeholder="What are you selling?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    placeholder="Describe your item, include condition, age, etc."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formState.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formState.category} 
                      onValueChange={handleCategoryChange as (value: string) => void}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Item Location</Label>
                  <div className="flex items-center p-3 bg-muted/50 rounded-md">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user?.location ? (
                      <span>{user.location.address}</span>
                    ) : (
                      <span className="text-muted-foreground">Please set your location in your profile</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Images (URLs)</Label>
                  {formState.imageUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {formState.imageUrls.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleRemoveImageField(index)}
                        >
                          &times;
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {formState.imageUrls.length < 5 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddImageField} 
                      className="w-full"
                    >
                      Add Another Image
                    </Button>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    For demo purposes, leave blank to use a default image
                  </p>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Listing'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4 text-sm text-muted-foreground">
            All listings are public and visible to users in your area
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateListing;
