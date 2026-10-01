export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
  material: '18K Yellow Gold' | '18K Rose Gold' | '18K White Gold' | 'Platinum' | '22K Gold';
  gemstone?: string;
  images: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  specs: { label: string; value: string }[];
  details: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}
