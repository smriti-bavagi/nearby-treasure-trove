
import { Product, User, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "San Francisco, CA"
    }
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    location: {
      lat: 37.7833,
      lng: -122.4167,
      address: "San Francisco, CA"
    }
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    location: {
      lat: 37.7694,
      lng: -122.4862,
      address: "San Francisco, CA"
    }
  }
];

export const mockProducts: Product[] = [
  {
    id: "prod1",
    title: "MacBook Pro 2021",
    description: "Slightly used MacBook Pro with M1 chip, 16GB RAM, 512GB SSD. In excellent condition with original packaging.",
    price: 1299,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    ],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    sellerId: "user1",
    sellerName: "John Doe",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "Financial District, San Francisco, CA"
    }
  },
  {
    id: "prod2",
    title: "Vintage Leather Sofa",
    description: "Beautiful vintage brown leather sofa. Some wear but in good condition. Very comfortable and adds character to any room.",
    price: 450,
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVhdGhlciUyMHNvZmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1567016520496-0cb37ff2e4fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxlYXRoZXIlMjBzb2ZhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    ],
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    sellerId: "user2",
    sellerName: "Jane Smith",
    location: {
      lat: 37.7833,
      lng: -122.4167,
      address: "Nob Hill, San Francisco, CA"
    }
  },
  {
    id: "prod3",
    title: "Mountain Bike - Trek",
    description: "Trek mountain bike in great condition. Recently serviced with new brakes and gears tuned up. Perfect for trails or city commuting.",
    price: 350,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1575585269294-7d28dd912db8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    ],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    sellerId: "user3",
    sellerName: "Robert Johnson",
    location: {
      lat: 37.7694,
      lng: -122.4862,
      address: "Sunset District, San Francisco, CA"
    }
  },
  {
    id: "prod4",
    title: "Sony PS5 with Extra Controller",
    description: "Like-new PlayStation 5 with an extra controller. Includes original packaging and cables. Only selling because I don't have time to use it.",
    price: 425,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheXN0YXRpb24lMjA1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    sellerId: "user1",
    sellerName: "John Doe",
    location: {
      lat: 37.7759,
      lng: -122.4245,
      address: "Mission District, San Francisco, CA"
    }
  },
  {
    id: "prod5",
    title: "Vintage Vinyl Records Collection",
    description: "Collection of 25 classic rock vinyl records from the 70s and 80s. All in excellent playing condition with minimal wear.",
    price: 175,
    category: "Other",
    images: [
      "https://images.unsplash.com/photo-1603048588665-791ca91d0e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmludGFnZSUyMHZpbnlsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmludGFnZSUyMHZpbnlsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    ],
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    sellerId: "user2",
    sellerName: "Jane Smith",
    location: {
      lat: 37.7903,
      lng: -122.4024,
      address: "North Beach, San Francisco, CA"
    }
  },
  {
    id: "prod6",
    title: "DSLR Camera - Canon EOS 80D",
    description: "Canon EOS 80D DSLR camera with 18-135mm lens. Includes camera bag, extra battery, and 64GB SD card. Great condition.",
    price: 675,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fub24lMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    ],
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    sellerId: "user3",
    sellerName: "Robert Johnson",
    location: {
      lat: 37.7841,
      lng: -122.4088,
      address: "Russian Hill, San Francisco, CA"
    }
  }
];

export const categories: Category[] = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Home",
  "Garden",
  "Sports",
  "Toys",
  "Vehicles",
  "Other"
];
