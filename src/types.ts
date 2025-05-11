
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
};

export type Category = 
  | "Electronics" 
  | "Furniture" 
  | "Clothing" 
  | "Books" 
  | "Home" 
  | "Garden" 
  | "Sports" 
  | "Toys" 
  | "Vehicles"
  | "Other";

export type Currency = "INR" | "USD";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  category: Category;
  images: string[];
  createdAt: string;
  sellerId: string;
  sellerName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance?: number; // calculated field
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserLocation: (location: { lat: number; lng: number; address: string }) => void;
};

export type FilterOptions = {
  category: Category | "All";
  distance: number;
  searchTerm: string;
};
