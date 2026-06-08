/**
 * TypeScript Types for Mosh Hair & Beauty Salon
 */

export type Page = 'home' | 'services' | 'process' | 'gallery' | 'bookings' | 'shop' | 'hair' | 'skin' | 'slimming' | 'weddings';

export interface Product {
  id: string;
  name: string;
  brand: string;
  priceLKR: number;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  category: 'treatment' | 'styling' | 'shampoo' | 'oil';
  isPopular: boolean;
  stock: number;
}

export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'skin' | 'slimming' | 'bridal';
  priceLKR: number;
  durationMinutes: number;
  description: string;
  tagline?: string;
  imageUrl?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  bio: string;
  availableDays: string[]; // e.g. ["Monday", "Wednesday", "Friday"]
  availableHours: string[]; // e.g. ["09:00 AM", ...]
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  stylistId: string;
  stylistName: string;
  serviceIds: string[];
  serviceNames: string[];
  totalPrice: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  specialNotes?: string;
  status: 'confirmed' | 'cancelled' | 'attended';
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    description: string;
    serviceTag: string; // Suggests a category or service id/keyword
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  afterUrl: string;
  beforeUrl: string;
  clientName: string;
  reviewText?: string;
  rating?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}
