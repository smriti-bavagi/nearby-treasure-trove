
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { MapPin } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, setUserLocation, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [locationInput, setLocationInput] = useState(
    user?.location?.address || ''
  );
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleUpdateLocation = async () => {
    if (!user) return;
    
    setIsUpdatingLocation(true);
    try {
      // In a real app, this would use a geocoding API to convert address to coordinates
      // For demo, we'll use mock coordinates
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock latitude and longitude based on input (random variation around San Francisco)
      const latitude = 37.7749 + (Math.random() - 0.5) * 0.1;
      const longitude = -122.4194 + (Math.random() - 0.5) * 0.1;
      
      setUserLocation({
        lat: latitude,
        lng: longitude,
        address: locationInput
      });
      
      toast.success('Location updated successfully');
    } catch (error) {
      toast.error('Failed to update location');
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-3xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Your Location
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This helps us show you items near you and calculate distances
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      placeholder="Enter your address, city, or zip code"
                    />
                    <Button 
                      onClick={handleUpdateLocation}
                      disabled={isUpdatingLocation || !locationInput}
                    >
                      {isUpdatingLocation ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                  
                  {user.location && (
                    <div className="bg-muted/50 p-3 mt-2 rounded-md">
                      <div className="text-sm">
                        <span className="font-medium">Current location:</span> {user.location.address}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Coordinates: {user.location.lat.toFixed(4)}, {user.location.lng.toFixed(4)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">Account Settings</h3>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={user.name} disabled />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user.email} disabled />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full"
              >
                Log Out
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This is a demo app. Account settings cannot be changed.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
