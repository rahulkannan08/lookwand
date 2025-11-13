import Link from 'next/link'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the 3D viewer to avoid SSR issues
const DressViewer3D = dynamic(() => import('../components/DressViewer3D'), { ssr: false })

// Comprehensive dress collection with diverse styles, colors, and 360° poses
const DRESSES = [
  // WOMEN'S EVENING WEAR
  { 
    id: 1, 
    name: 'Elegant Evening Gown', 
    category: 'women', 
    brand: 'Luxe', 
    size: 'M', 
    color: 'Black', 
    price: '$299',
    description: 'Sophisticated black evening gown with elegant silhouette',
    images: {
      front: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop'
    },
    // Full 360° rotation (18 frames for smooth rotation)
    images360: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&sat=-2',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&sat=-4',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&sat=-2',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&sat=-3',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&sat=2',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&sat=2',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&sat=4',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&sat=3',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&sat=5',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&sat=4',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&sat=2',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&sat=1',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&brightness=98',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&brightness=99'
    ]
  },
  { 
    id: 2, 
    name: 'Burgundy Velvet Gown', 
    category: 'women', 
    brand: 'Luxe', 
    size: 'L', 
    color: 'Burgundy', 
    price: '$349',
    description: 'Luxurious velvet gown in deep burgundy',
    images: {
      front: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&hue=10',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&hue=-5',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&hue=-10',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&hue=5',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&hue=8',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&hue=12',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&hue=15',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&hue=8',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&hue=3'
    ]
  },
  { 
    id: 3, 
    name: 'Emerald Cocktail Dress', 
    category: 'women', 
    brand: 'Luxe', 
    size: 'S', 
    color: 'Emerald', 
    price: '$259',
    description: 'Stunning emerald green cocktail dress',
    images: {
      front: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop'
    }
    // No 360° - testing conditional rendering
  },
  
  // WOMEN'S CASUAL & DAY WEAR
  { 
    id: 4, 
    name: 'Casual Summer Dress', 
    category: 'women', 
    brand: 'Breeze', 
    size: 'S', 
    color: 'White', 
    price: '$89',
    description: 'Light and breezy summer dress',
    images: {
      front: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 5, 
    name: 'Floral Midi Dress', 
    category: 'women', 
    brand: 'Garden', 
    size: 'M', 
    color: 'Floral', 
    price: '$129',
    description: 'Beautiful floral print midi dress',
    images: {
      front: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&brightness=98',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&brightness=97',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&brightness=99',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&brightness=101',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&brightness=103',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&brightness=102',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&brightness=102',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&brightness=101',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&brightness=99'
    ]
  },
  { 
    id: 6, 
    name: 'Boho Maxi Dress', 
    category: 'women', 
    brand: 'Breeze', 
    size: 'L', 
    color: 'Beige', 
    price: '$149',
    description: 'Flowing bohemian maxi dress',
    images: {
      front: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 7, 
    name: 'Denim Shirt Dress', 
    category: 'women', 
    brand: 'Urban', 
    size: 'M', 
    color: 'Blue', 
    price: '$99',
    description: 'Classic denim shirt dress',
    images: {
      front: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&sat=-3',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&sat=-2',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&sat=-1',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&sat=2',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&sat=3',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&sat=4',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&sat=3',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&sat=1',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&brightness=98'
    ]
  },
  { 
    id: 8, 
    name: 'Wrap Dress - Leopard', 
    category: 'women', 
    brand: 'Wild', 
    size: 'S', 
    color: 'Leopard', 
    price: '$119',
    description: 'Trendy leopard print wrap dress',
    images: {
      front: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop'
    }
  },
  
  // WOMEN'S OFFICE & PROFESSIONAL
  { 
    id: 9, 
    name: 'Classic Suit Dress', 
    category: 'women', 
    brand: 'Sharp', 
    size: 'M', 
    color: 'Navy', 
    price: '$199',
    description: 'Professional navy suit dress',
    images: {
      front: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 10, 
    name: 'Business Pencil Dress', 
    category: 'women', 
    brand: 'Sharp', 
    size: 'M', 
    color: 'Grey', 
    price: '$159',
    description: 'Elegant grey pencil dress for the office',
    images: {
      front: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&contrast=95',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&contrast=97',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop&contrast=99',
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop&contrast=101',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&contrast=103',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&contrast=105',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&contrast=104',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&contrast=102',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&contrast=98'
    ]
  },
  
  // MEN'S COLLECTION
  { 
    id: 11, 
    name: 'Men Formal Shirt', 
    category: 'men', 
    brand: 'Sharp', 
    size: 'L', 
    color: 'White', 
    price: '$79',
    description: 'Classic white formal shirt',
    images: {
      front: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 12, 
    name: 'Men Casual Polo', 
    category: 'men', 
    brand: 'Urban', 
    size: 'M', 
    color: 'Navy', 
    price: '$59',
    description: 'Comfortable navy polo shirt',
    images: {
      front: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop&brightness=98',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop&brightness=97',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop&brightness=102',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop&brightness=103',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop&brightness=101',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop&brightness=99'
    ]
  },
  { 
    id: 13, 
    name: 'Men Denim Jacket', 
    category: 'men', 
    brand: 'Rugged', 
    size: 'L', 
    color: 'Blue', 
    price: '$129',
    description: 'Classic blue denim jacket',
    images: {
      front: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 14, 
    name: 'Men Leather Jacket', 
    category: 'men', 
    brand: 'Rebel', 
    size: 'XL', 
    color: 'Black', 
    price: '$299',
    description: 'Premium black leather jacket',
    images: {
      front: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=1000&fit=crop&sat=-2',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&sat=-3',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop&sat=-1',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop&sat=2',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&sat=3',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop&sat=4',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=1000&fit=crop&sat=3',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=1000&fit=crop&sat=1',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=1000&fit=crop&brightness=98'
    ]
  },
  
  // KIDS COLLECTION
  { 
    id: 15, 
    name: 'Kids Party Dress', 
    category: 'kids', 
    brand: 'Joy', 
    size: 'XS', 
    color: 'Pink', 
    price: '$59',
    description: 'Adorable pink party dress for kids',
    images: {
      front: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 16, 
    name: 'Kids Denim Overalls', 
    category: 'kids', 
    brand: 'Play', 
    size: 'S', 
    color: 'Blue', 
    price: '$45',
    description: 'Cute denim overalls for kids',
    images: {
      front: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop&brightness=99',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop&brightness=98',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop&brightness=102',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop&brightness=103',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop&brightness=101',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop&brightness=100'
    ]
  },
  { 
    id: 17, 
    name: 'Kids Summer Tee', 
    category: 'kids', 
    brand: 'Sunny', 
    size: 'XS', 
    color: 'Yellow', 
    price: '$25',
    description: 'Bright yellow summer t-shirt',
    images: {
      front: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&h=1000&fit=crop'
    }
  },
  { 
    id: 18, 
    name: 'Kids Winter Coat', 
    category: 'kids', 
    brand: 'Cozy', 
    size: 'M', 
    color: 'Red', 
    price: '$89',
    description: 'Warm red winter coat for kids',
    images: {
      front: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=1000&fit=crop'
    }
  },
  
  // ADDITIONAL WOMEN'S STYLES
  { 
    id: 19, 
    name: 'Satin Slip Dress', 
    category: 'women', 
    brand: 'Silk', 
    size: 'S', 
    color: 'Champagne', 
    price: '$189',
    description: 'Luxurious champagne satin slip dress',
    images: {
      front: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop'
    },
    images360: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&brightness=102',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&brightness=101',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&brightness=99',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&brightness=98',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&brightness=97',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&brightness=103',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&brightness=104',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&brightness=103',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop&brightness=101'
    ]
  },
  { 
    id: 20, 
    name: 'Lace Evening Dress', 
    category: 'women', 
    brand: 'Romance', 
    size: 'M', 
    color: 'Nude', 
    price: '$249',
    description: 'Delicate lace evening dress',
    images: {
      front: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
      side: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
      back: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop'
    }
  },
]

export default function Lookbook() {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentAngle, setCurrentAngle] = useState('front')
  const [searchQuery, setSearchQuery] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [viewer3DOpen, setViewer3DOpen] = useState(false)

  // Filter dresses based on all active filters
  const filteredDresses = DRESSES.filter(dress => {
    const matchesCategory = categoryFilter === 'all' || dress.category === categoryFilter
    const matchesBrand = brandFilter === 'all' || dress.brand === brandFilter
    const matchesSize = sizeFilter === 'all' || dress.size === sizeFilter
    const matchesSearch = searchQuery === '' || dress.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesBrand && matchesSize && matchesSearch
  })

  const currentDress = filteredDresses[currentIndex]
  const brands = ['all', ...new Set(DRESSES.map(d => d.brand))]
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL']

  const goToPrevious = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? filteredDresses.length - 1 : prev - 1))
    setTimeout(() => setImageLoading(false), 300)
  }

  const goToNext = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev === filteredDresses.length - 1 ? 0 : prev + 1))
    setTimeout(() => setImageLoading(false), 300)
  }

  const changeAngle = (angle) => {
    setImageLoading(true)
    setCurrentAngle(angle)
    setTimeout(() => setImageLoading(false), 200)
  }

  // Reset index when filters change
  const handleFilterChange = (filterType, value) => {
    setCurrentIndex(0)
    if (filterType === 'category') setCategoryFilter(value)
    else if (filterType === 'brand') setBrandFilter(value)
    else if (filterType === 'size') setSizeFilter(value)
    else if (filterType === 'search') setSearchQuery(value)
  }

  return (
    <div className="page-root">
      <header className="topbar">
        <nav className="nav">
          <div className="nav-left">
            <div className="logo-wrapper">
              <span className="logo-text">LookWand</span>
            </div>
            <input 
              type="text" 
              className="search" 
              placeholder="Search dresses..."
              value={searchQuery}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <ul className="nav-items">
            <li className={brandFilter === 'all' && categoryFilter === 'all' ? 'active' : ''} onClick={() => { handleFilterChange('brand', 'all'); handleFilterChange('category', 'all') }}>all</li>
            {brands.filter(b => b !== 'all').map(brand => (
              <li key={brand} className={brandFilter === brand ? 'active' : ''} onClick={() => { handleFilterChange('brand', brand); handleFilterChange('category', 'all') }}>{brand}</li>
            ))}
            <li className={categoryFilter === 'men' ? 'active' : ''} onClick={() => { handleFilterChange('category', 'men'); handleFilterChange('brand', 'all') }}>men</li>
            <li className={categoryFilter === 'women' ? 'active' : ''} onClick={() => { handleFilterChange('category', 'women'); handleFilterChange('brand', 'all') }}>women</li>
            <li className={categoryFilter === 'kids' ? 'active' : ''} onClick={() => { handleFilterChange('category', 'kids'); handleFilterChange('brand', 'all') }}>kids</li>
          </ul>
        </nav>
      </header>

      <main className="hero">
        {filteredDresses.length === 0 ? (
          <div className="no-results">
            <p>No dresses found matching your filters.</p>
            <button className="reset-btn" onClick={() => { setCategoryFilter('all'); setBrandFilter('all'); setSizeFilter('all'); setSearchQuery(''); setCurrentIndex(0) }}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Left Arrow */}
            <div className="arrow-btn left-arrow" onClick={goToPrevious}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>

            {/* Main Canvas with Dress Display */}
            <div className="canvas">
              <div className={`dress-display ${imageLoading ? 'loading' : ''}`}>
                <img 
                  src={currentDress.images[currentAngle]} 
                  alt={`${currentDress.name} - ${currentAngle} view`}
                  className="main-dress-img"
                />
                
                {/* Camera Angle Widget - Interactive buttons overlaid on image */}
                <div className="angle-widget">
                  <div className="angle-label">Camera View</div>
                  <div className="angle-buttons">
                    <button 
                      className={`angle-btn ${currentAngle === 'front' ? 'active' : ''}`}
                      onClick={() => changeAngle('front')}
                      title="Front View"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Front</span>
                    </button>
                    <button 
                      className={`angle-btn ${currentAngle === 'side' ? 'active' : ''}`}
                      onClick={() => changeAngle('side')}
                      title="Side View"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-9-9"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Side</span>
                    </button>
                    <button 
                      className={`angle-btn ${currentAngle === 'back' ? 'active' : ''}`}
                      onClick={() => changeAngle('back')}
                      title="Back View"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12h8"></path>
                      </svg>
                      <span>Back</span>
                    </button>
                  </div>
                </div>

                {/* Dress Info Overlay */}
                <div className="dress-info-overlay">
                  <h2 className="dress-title">{currentDress.name}</h2>
                  <div className="dress-meta-row">
                    <span className="meta-item">{currentDress.brand}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">{currentDress.color}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">Size {currentDress.size}</span>
                  </div>
                  <div className="dress-price-row">
                    <span className="price">{currentDress.price}</span>
                    {/* Only show 360° button if dress has images360 array */}
                    {currentDress.images360 && currentDress.images360.length > 0 && (
                      <button className="view-3d-btn" onClick={() => setViewer3DOpen(true)}>
                        🔄 360° View
                      </button>
                    )}
                    <button className="add-cart-btn">Add to Cart</button>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="progress-indicator">
                  {currentIndex + 1} / {filteredDresses.length}
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <div className="arrow-btn right-arrow" onClick={goToNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </>
        )}
      </main>

      {/* Bottom Filters */}
      <div className="bottom-filters">
        <select className="chip" value={sizeFilter} onChange={(e) => handleFilterChange('size', e.target.value)}>
          <option value="all">Sizes</option>
          {sizes.filter(s => s !== 'all').map(size => <option key={size} value={size}>{size}</option>)}
        </select>
        
        {/* Camera Angle Selector */}
        {filteredDresses.length > 0 && (
          <select className="chip" value={currentAngle} onChange={(e) => changeAngle(e.target.value)}>
            <option value="front">Camera: Front</option>
            <option value="side">Camera: Side</option>
            <option value="back">Camera: Back</option>
          </select>
        )}
        
        {/* Poses/360° Viewer Button */}
        {filteredDresses.length > 0 && currentDress.images360 && currentDress.images360.length > 0 && (
          <button className="chip poses-btn" onClick={() => setViewer3DOpen(true)}>
            📸 Poses
          </button>
        )}
      </div>

      {/* 3D Viewer Modal */}
      {viewer3DOpen && currentDress && (
        <DressViewer3D 
          dress={currentDress} 
          onClose={() => setViewer3DOpen(false)} 
        />
      )}

      <footer className="footer">
        <Link href="/" className="back">← Back to Home</Link>
      </footer>

      <style jsx>{`
        * { -webkit-tap-highlight-color: transparent; }
        
        .page-root { 
          min-height:100vh; 
          display:flex; 
          flex-direction:column; 
          background:#f7f7f9; 
          padding-bottom:80px;
          overflow-x:hidden;
        }
        
        .topbar{
          position:sticky; 
          top:0; 
          background:white; 
          box-shadow:0 2px 8px rgba(0,0,0,0.08); 
          z-index:100;
          transition:box-shadow 0.3s ease;
        }
        
        .topbar:hover{
          box-shadow:0 4px 12px rgba(0,0,0,0.12);
        }
        
        .nav{
          max-width:1400px; 
          margin:0 auto; 
          display:flex; 
          align-items:center; 
          justify-content:space-between;
          padding:14px 20px; 
          gap:16px;
        }
        
        .nav-left{display:flex; align-items:center; gap:16px}
        
        .logo-wrapper{
          display:flex;
          align-items:center;
          gap:8px;
        }
        
        .logo-text{
          font-size:24px;
          font-weight:800;
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          letter-spacing:-0.5px;
        }
        
        .nav-left .search{
          padding:10px 14px;
          border-radius:8px;
          border:1px solid #ddd;
          background:#f9fafb; 
          width:240px; 
          transition:all 0.3s ease;
          font-size:14px;
        }
        .nav-left .search:focus{
          outline:none; 
          border-color:#E85D4F; 
          background:#fff; 
          box-shadow:0 0 0 3px rgba(232, 93, 79, 0.1);
          transform:scale(1.02);
        }
        .nav-left .search::placeholder{
          color:#9ca3af;
          transition:color 0.3s;
        }
        .nav-left .search:focus::placeholder{
          color:#6b7280;
        }
        
        .nav-items{
          list-style:none; 
          display:flex; 
          gap:10px; 
          margin:0; 
          padding:0; 
          flex-wrap:wrap;
        }
        .nav-items li{
          padding:10px 16px;
          border-radius:8px;
          border:1px solid #e5e7eb;
          background:#fff; 
          cursor:pointer; 
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          text-transform:capitalize; 
          font-weight:500; 
          font-size:14px; 
          user-select:none;
          position:relative;
          overflow:hidden;
        }
        .nav-items li::before{
          content:'';
          position:absolute;
          top:0;
          left:-100%;
          width:100%;
          height:100%;
          background:linear-gradient(90deg, transparent, rgba(232, 93, 79, 0.1), transparent);
          transition:left 0.5s;
        }
        .nav-items li:hover::before{
          left:100%;
        }
        .nav-items li:hover{
          background:#f9fafb; 
          border-color:#E85D4F; 
          transform:translateY(-2px);
          box-shadow:0 4px 8px rgba(0,0,0,0.08);
        }
        .nav-items li:active{
          transform:translateY(0);
        }
        .nav-items li.active{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%); 
          color:#fff; 
          border-color:#E85D4F;
          box-shadow:0 4px 12px rgba(232, 93, 79, 0.3);
        }

        .hero{
          flex:1; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          padding:40px 20px; 
          gap:20px; 
          position:relative;
        }
        
        /* Arrow Buttons */
        .arrow-btn{
          width:60px; 
          height:60px; 
          background:white; 
          border-radius:50%; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          cursor:pointer; 
          box-shadow:0 4px 12px rgba(0,0,0,0.1); 
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color:#111827;
          z-index:10;
          border:2px solid transparent;
        }
        .arrow-btn:hover{
          transform:scale(1.15);
          box-shadow:0 8px 24px rgba(232, 93, 79, 0.4);
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%);
          color:white;
          border-color:rgba(255,255,255,0.3);
        }
        .arrow-btn:active{
          transform:scale(1.05);
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow:0 4px 12px rgba(0,0,0,0.1); }
          50% { box-shadow:0 4px 20px rgba(232, 93, 79, 0.3); }
        }

        /* Main Canvas */
        .canvas{
          flex:1; 
          max-width:900px; 
          height:75vh;
          min-height:600px;
          background:white; 
          border-radius:16px; 
          box-shadow:0 8px 32px rgba(0,0,0,0.12);
          overflow:hidden;
          position:relative;
          transition:box-shadow 0.3s ease;
        }
        
        .canvas:hover{
          box-shadow:0 12px 40px rgba(0,0,0,0.16);
        }

        .dress-display{
          width:100%; 
          height:100%; 
          position:relative;
          transition:opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dress-display.loading{
          opacity:0.7;
          filter:blur(2px);
        }

        .main-dress-img{
          width:100%; 
          height:100%; 
          object-fit:cover;
          display:block;
          transition:transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .dress-display:not(.loading):hover .main-dress-img{
          transform:scale(1.02);
        }

        /* Camera Angle Widget - overlaid on image */
        .angle-widget{
          position:absolute;
          top:20px;
          right:20px;
          background:rgba(255,255,255,0.98);
          backdrop-filter:blur(12px);
          border-radius:12px;
          padding:12px;
          box-shadow:0 4px 20px rgba(0,0,0,0.15);
          z-index:20;
          animation:slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transition:transform 0.3s ease;
        }
        
        .angle-widget:hover{
          transform:translateY(-2px);
          box-shadow:0 6px 24px rgba(0,0,0,0.2);
        }

        @keyframes slideInRight{
          from{opacity:0; transform:translateX(30px)}
          to{opacity:1; transform:translateX(0)}
        }

        .angle-label{
          font-size:11px;
          text-transform:uppercase;
          font-weight:700;
          color:#6b7280;
          margin-bottom:10px;
          letter-spacing:0.5px;
        }

        .angle-buttons{
          display:flex;
          flex-direction:column;
          gap:8px;
        }

        .angle-btn{
          display:flex;
          align-items:center;
          gap:8px;
          padding:10px 14px;
          border-radius:8px;
          border:1px solid #e5e7eb;
          background:white;
          cursor:pointer;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size:13px;
          font-weight:600;
          color:#374151;
          min-width:120px;
          position:relative;
          overflow:hidden;
        }
        
        .angle-btn::after{
          content:'';
          position:absolute;
          top:50%;
          left:50%;
          width:0;
          height:0;
          border-radius:50%;
          background:rgba(232, 93, 79, 0.1);
          transform:translate(-50%, -50%);
          transition:width 0.4s, height 0.4s;
        }
        
        .angle-btn:hover::after{
          width:200%;
          height:200%;
        }

        .angle-btn:hover{
          border-color:#E85D4F;
          background:#f9fafb;
          transform:translateX(-4px);
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
        }

        .angle-btn.active{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%);
          color:white;
          border-color:#E85D4F;
          box-shadow:0 4px 16px rgba(232, 93, 79, 0.4);
          transform:translateX(-4px) scale(1.02);
        }

        .angle-btn svg{
          flex-shrink:0;
        }

        /* Dress Info Overlay */
        .dress-info-overlay{
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 70%, transparent 100%);
          padding:30px 24px 24px;
          color:white;
          animation:slideInUp 0.5s ease-out;
        }

        @keyframes slideInUp{
          from{opacity:0; transform:translateY(20px)}
          to{opacity:1; transform:translateY(0)}
        }

        .dress-title{
          font-size:28px;
          font-weight:700;
          margin:0 0 10px;
          text-shadow:0 2px 8px rgba(0,0,0,0.3);
        }

        .dress-meta-row{
          display:flex;
          align-items:center;
          gap:8px;
          font-size:14px;
          margin-bottom:16px;
          opacity:0.95;
        }

        .meta-item{font-weight:500}
        .meta-divider{opacity:0.6}

        .dress-price-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
        }

        .price{
          font-size:32px;
          font-weight:800;
          text-shadow:0 2px 8px rgba(0,0,0,0.3);
        }

        .view-3d-btn{
          background:rgba(255,255,255,0.15);
          color:white;
          border:2px solid rgba(255,255,255,0.3);
          padding:10px 18px;
          border-radius:8px;
          cursor:pointer;
          font-weight:600;
          font-size:14px;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter:blur(10px);
        }

        .view-3d-btn:hover{
          background:rgba(255,255,255,0.3);
          border-color:rgba(255,255,255,0.6);
          transform:translateY(-2px) scale(1.05);
          box-shadow:0 4px 12px rgba(0,0,0,0.2);
        }
        
        .view-3d-btn:active{
          transform:translateY(0) scale(1.02);
        }

        .add-cart-btn{
          background:white;
          color:#111827;
          border:none;
          padding:12px 28px;
          border-radius:8px;
          font-weight:700;
          cursor:pointer;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size:15px;
          box-shadow:0 2px 8px rgba(255,255,255,0.2);
        }

        .add-cart-btn:hover{
          transform:translateY(-3px) scale(1.08);
          box-shadow:0 6px 20px rgba(255,255,255,0.4);
          background:linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
        }
        
        .add-cart-btn:active{
          transform:translateY(-1px) scale(1.04);
        }

        /* Progress Indicator */
        .progress-indicator{
          position:absolute;
          top:20px;
          left:20px;
          background:rgba(0,0,0,0.7);
          backdrop-filter:blur(8px);
          color:white;
          padding:8px 16px;
          border-radius:20px;
          font-size:13px;
          font-weight:600;
          z-index:20;
        }

        /* No Results */
        .no-results{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:20px;
          padding:60px 20px;
          color:#6b7280;
        }

        .no-results p{font-size:18px; margin:0}

        .reset-btn{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%);
          color:white;
          border:none;
          padding:12px 24px;
          border-radius:8px;
          cursor:pointer;
          font-weight:600;
          transition:all 0.2s;
        }

        .reset-btn:hover{transform:translateY(-2px); box-shadow:0 4px 12px rgba(232, 93, 79, 0.3)}

        /* Bottom Filters */
        .bottom-filters{
          position:fixed; 
          left:50%; 
          transform:translateX(-50%); 
          bottom:20px; 
          display:flex; 
          gap:12px; 
          z-index:200; 
          background:rgba(255,255,255,0.95); 
          padding:12px 20px; 
          border-radius:12px; 
          box-shadow:0 4px 16px rgba(0,0,0,0.12); 
          backdrop-filter:blur(8px);
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .bottom-filters:hover{
          box-shadow:0 6px 24px rgba(0,0,0,0.16);
        }

        .chip{
          background:#fff; 
          padding:10px 16px; 
          border-radius:8px; 
          border:1px solid #e5e7eb; 
          box-shadow:0 2px 6px rgba(0,0,0,0.05); 
          cursor:pointer; 
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          font-size:14px; 
          font-weight:500;
          color:#374151;
          position:relative;
          overflow:hidden;
          -webkit-tap-highlight-color:transparent;
        }
        
        .chip::before{
          content:'';
          position:absolute;
          top:50%;
          left:50%;
          width:0;
          height:0;
          border-radius:50%;
          background:rgba(232, 93, 79, 0.1);
          transform:translate(-50%, -50%);
          transition:width 0.5s, height 0.5s;
        }
        
        .chip:hover::before{
          width:300%;
          height:300%;
        }

        .chip:hover{
          border-color:#E85D4F; 
          transform:translateY(-3px) scale(1.05);
          box-shadow:0 6px 16px rgba(0,0,0,0.15);
        }
        
        .chip:active{
          transform:translateY(-1px) scale(1.02);
        }

        .chip.poses-btn{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 100%);
          color:#fff;
          border-color:#E85D4F;
          font-weight:600;
          box-shadow:0 2px 8px rgba(232, 93, 79, 0.3);
        }
        
        .chip.poses-btn::before{
          background:rgba(255,255,255,0.15);
        }

        .chip.poses-btn:hover{
          background:linear-gradient(135deg, #D94C3D 0%, #E85D4F 100%);
          transform:translateY(-4px) scale(1.08);
          box-shadow:0 6px 20px rgba(232, 93, 79, 0.5);
        }
        
        .chip.poses-btn:active{
          transform:translateY(-1px) scale(1.03);
        }

        .chip.reset{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%); 
          color:#fff; 
          border-color:#E85D4F;
        }

        .chip.reset:hover{
          background:linear-gradient(135deg, #D94C3D 0%, #F47C3C 50%, #E85D4F 100%);
        }

        .footer{
          padding:20px; 
          text-align:center; 
          background:white; 
          border-top:1px solid #e5e7eb;
          transition:border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .footer:hover{
          border-top-color:#E85D4F;
        }
        
        .back{
          color:#111827; 
          text-decoration:none; 
          font-weight:500; 
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display:inline-block;
        }
        
        .back:hover{
          color:#E85D4F;
          transform:translateX(-4px);
        }

        /* Responsive */
        @media (max-width:900px){
          .nav{
            flex-direction:column; 
            align-items:stretch; 
            gap:12px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .nav-left{justify-content:stretch}
          .nav-left .search{width:100%}
          .nav-items{justify-content:center}
          
          .hero{padding:20px 10px; gap:10px}
          .arrow-btn{
            width:50px; 
            height:50px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .canvas{
            height:65vh; 
            min-height:500px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .dress-title{font-size:22px}
          .price{font-size:26px}
          .add-cart-btn{
            padding:10px 20px; 
            font-size:14px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .bottom-filters{
            padding:10px 16px;
            gap:10px;
            bottom:15px;
          }
          
          .chip{
            padding:8px 14px;
            font-size:13px;
          }
        }

        @media (max-width:600px){
          .arrow-btn{
            width:44px; 
            height:44px;
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .arrow-btn:hover{
            transform:translateY(-50%) scale(1.1);
          }
          
          .left-arrow{left:10px}
          .right-arrow{right:10px}
          
          .canvas{
            height:70vh; 
            min-height:400px; 
            border-radius:12px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .angle-widget{
            top:10px;
            right:10px;
            padding:8px;
            border-radius:8px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .angle-label{font-size:10px; margin-bottom:6px}
          
          .angle-buttons{gap:6px}
          
          .angle-btn{
            padding:8px 10px;
            min-width:auto;
            font-size:11px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .angle-btn span{display:none}
          
          .dress-info-overlay{
            padding:20px 16px 16px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dress-title{font-size:18px}
          .dress-meta-row{font-size:12px; margin-bottom:12px}
          .price{font-size:22px}
          .add-cart-btn{
            padding:8px 16px; 
            font-size:13px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .progress-indicator{
            top:10px;
            left:10px;
            padding:6px 12px;
            font-size:11px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .bottom-filters{
            flex-wrap:nowrap; 
            gap:8px; 
            padding:10px 12px; 
            bottom:10px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            justify-content:center;
            width:auto;
            max-width:95%;
          }
          
          .chip{
            padding:8px 12px; 
            font-size:12px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space:nowrap;
            flex-shrink:0;
          }
          
          .chip select{
            font-size:12px;
          }
        }
        }
      `}</style>
    </div>
  )
}
