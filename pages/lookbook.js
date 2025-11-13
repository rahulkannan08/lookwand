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
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Black', 'Navy', 'Burgundy'],
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
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Burgundy', 'Wine', 'Maroon'],
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
    availableSizes: ['XS', 'S', 'M'],
    availableColors: ['Emerald', 'Forest Green', 'Teal'],
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
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['White', 'Beige', 'Light Blue'],
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
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Beige', 'White', 'Terracotta'],
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
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Blue', 'Light Wash', 'Black'],
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
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Leopard', 'Snake', 'Zebra'],
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
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Navy', 'Black', 'Charcoal'],
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
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['White', 'Light Blue', 'Pink'],
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
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Blue', 'Black', 'Light Wash'],
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
    availableSizes: ['2T', '3T', '4T', '5T', '6'],
    availableColors: ['Pink', 'Purple', 'White'],
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
    availableSizes: ['2T', '3T', '4T', '5T', '6'],
    availableColors: ['Yellow', 'Orange', 'Green', 'Blue'],
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
    availableSizes: ['2T', '3T', '4T', '5T', '6', '7', '8'],
    availableColors: ['Red', 'Navy', 'Black'],
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
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Champagne', 'Black', 'Emerald'],
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
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Nude', 'Black', 'Navy'],
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

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

  // Get all available images for current dress
  const getAllImages = (dress) => {
    if (!dress) return []
    const images = []
    // Add regular angle views
    if (dress.images?.front) images.push({ url: dress.images.front, type: 'front' })
    if (dress.images?.side) images.push({ url: dress.images.side, type: 'side' })
    if (dress.images?.back) images.push({ url: dress.images.back, type: 'back' })
    // Add 360 images if available
    if (dress.images360 && dress.images360.length > 0) {
      dress.images360.forEach((url, idx) => {
        images.push({ url, type: `360-${idx}` })
      })
    }
    return images
  }

  const handleThumbnailClick = (index, imageData) => {
    setImageLoading(true)
    setSelectedImageIndex(index)
    // Update angle if it's a regular view
    if (imageData.type === 'front' || imageData.type === 'side' || imageData.type === 'back') {
      setCurrentAngle(imageData.type)
    }
    setTimeout(() => setImageLoading(false), 200)
  }

  // Get current image to display
  const getCurrentImage = () => {
    if (!currentDress) return ''
    const allImages = getAllImages(currentDress)
    if (allImages.length === 0) return ''
    return allImages[selectedImageIndex]?.url || currentDress.images[currentAngle]
  }

  // Calculate price based on size
  const calculatePrice = (basePrice, size) => {
    const priceNum = parseInt(basePrice.replace('$', ''))
    const sizePricing = {
      'XS': -10,
      'S': 0,
      'M': 0,
      'L': 10,
      'XL': 20
    }
    const adjustment = sizePricing[size] || 0
    return '$' + (priceNum + adjustment)
  }

  // Handle size change
  const handleSizeChange = (size) => {
    setSelectedSize(size)
    if (currentDress) {
      const newPrice = calculatePrice(currentDress.price, size)
      setCurrentPrice(newPrice)
    }
  }

  // Handle color change - simulates image change with filter
  const handleColorChange = (color) => {
    setImageLoading(true)
    setSelectedColor(color)
    // Reset to first image to show color change
    setSelectedImageIndex(0)
    setTimeout(() => setImageLoading(false), 300)
  }

  // Get color filter based on selected color
  const getColorFilter = () => {
    if (!selectedColor || selectedColor === currentDress?.color) return ''
    const colorFilters = {
      // Reds & Burgundies
      'Burgundy': 'hue-rotate(-20deg) saturate(1.3)',
      'Wine': 'hue-rotate(-30deg) saturate(1.4)',
      'Maroon': 'hue-rotate(-35deg) saturate(1.2)',
      'Red': 'hue-rotate(-10deg) saturate(1.3)',
      
      // Blues & Navies
      'Navy': 'hue-rotate(20deg) saturate(1.2)',
      'Blue': 'hue-rotate(15deg) saturate(1.1)',
      'Light Blue': 'hue-rotate(25deg) saturate(0.9) brightness(1.1)',
      'Teal': 'hue-rotate(120deg) saturate(1.2)',
      
      // Greens
      'Emerald': 'hue-rotate(80deg) saturate(1.4)',
      'Forest Green': 'hue-rotate(90deg) saturate(1.3)',
      'Green': 'hue-rotate(75deg) saturate(1.2)',
      
      // Neutrals
      'Black': 'brightness(0.7) contrast(1.3)',
      'Charcoal': 'brightness(0.8) contrast(1.2) saturate(0.5)',
      'White': 'brightness(1.2) saturate(0.7)',
      'Beige': 'hue-rotate(-15deg) saturate(0.6) brightness(1.05)',
      'Nude': 'hue-rotate(-10deg) saturate(0.7) brightness(1.08)',
      'Champagne': 'hue-rotate(-5deg) saturate(0.8) brightness(1.1)',
      'Terracotta': 'hue-rotate(-25deg) saturate(1.1) brightness(0.95)',
      
      // Denim Washes
      'Light Wash': 'hue-rotate(18deg) saturate(0.8) brightness(1.15)',
      
      // Pinks & Purples
      'Pink': 'hue-rotate(-40deg) saturate(1.2)',
      'Purple': 'hue-rotate(-50deg) saturate(1.3)',
      
      // Bright Colors
      'Yellow': 'hue-rotate(40deg) saturate(1.5) brightness(1.1)',
      'Orange': 'hue-rotate(-30deg) saturate(1.4) brightness(1.05)',
      
      // Animal Prints (subtle adjustments)
      'Leopard': 'saturate(1.2) contrast(1.1)',
      'Snake': 'saturate(0.9) contrast(1.15)',
      'Zebra': 'saturate(0.5) contrast(1.3)',
    }
    return colorFilters[selectedColor] || 'hue-rotate(30deg)'
  }

  // Reset selectedImageIndex when dress changes
  const goToPreviousWrapped = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? filteredDresses.length - 1 : prev - 1))
    setSelectedImageIndex(0)
    setShowAllThumbnails(false)
    setSelectedSize('')
    setSelectedColor('')
    setCurrentPrice('')
    setTimeout(() => setImageLoading(false), 300)
  }

  const goToNextWrapped = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev === filteredDresses.length - 1 ? 0 : prev + 1))
    setSelectedImageIndex(0)
    setShowAllThumbnails(false)
    setSelectedSize('')
    setSelectedColor('')
    setCurrentPrice('')
    setTimeout(() => setImageLoading(false), 300)
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
      {/* AI Info Banner */}
      <div className="ai-banner">
        <span className="ai-icon">🪄</span>
        <p className="ai-text">Generate AI avatars and fashion content from your uploaded photos</p>
      </div>
      
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
            <div className="arrow-btn left-arrow" onClick={goToPreviousWrapped}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>

            {/* Canvas and Thumbnail Container */}
            <div className="canvas-container">
              {/* Main Canvas with Dress Display */}
              <div className="canvas">
                <div className={`dress-display ${imageLoading ? 'loading' : ''}`}>
                  <img 
                    src={getCurrentImage()} 
                    alt={`${currentDress.name} - view ${selectedImageIndex + 1}`}
                    className="main-dress-img"
                    style={{ 
                      filter: getColorFilter(), 
                      transition: 'filter 0.3s ease' 
                    }}
                  />

                  {/* Progress indicator */}
                  <div className="progress-indicator">
                    {currentIndex + 1} / {filteredDresses.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery - Horizontal with See More */}
              <div className="thumbnail-gallery-outside">
                {(() => {
                  const allImages = getAllImages(currentDress)
                  const visibleCount = showAllThumbnails ? allImages.length : Math.min(5, allImages.length)
                  const hasMore = allImages.length > 5

                  return (
                    <>
                      {allImages.slice(0, visibleCount).map((imageData, index) => (
                        <div
                          key={index}
                          className={`thumbnail-box ${selectedImageIndex === index ? 'active' : ''}`}
                          onClick={() => handleThumbnailClick(index, imageData)}
                        >
                          <img src={imageData.url} alt={`View ${index + 1}`} />
                          <div className="thumbnail-number">{index + 1}</div>
                        </div>
                      ))}
                      
                      {hasMore && (
                        <button 
                          className="see-more-btn"
                          onClick={() => setShowAllThumbnails(!showAllThumbnails)}
                        >
                          {showAllThumbnails ? (
                            <>
                              <span>Show Less</span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>+{allImages.length - 5}</span>
                              <div className="see-more-text">More</div>
                            </>
                          )}
                        </button>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>

            {/* Right Sidebar with Options */}
            <div className="right-sidebar">
              <h2 className="dress-title">{currentDress.name}</h2>
              <p className="dress-description">{currentDress.description}</p>
              <div className="dress-brand">{currentDress.brand}</div>
              <div className="price-container">
                <div className="dress-price">{currentPrice || currentDress.price}</div>
                {selectedSize && (
                  <div className="size-indicator">Size: {selectedSize}</div>
                )}
              </div>

              {/* Camera View Selector */}
              <div className="option-section">
                <div className="option-label">Camera View</div>
                <div className="camera-buttons">
                  <button 
                    className={`camera-btn ${currentAngle === 'front' ? 'active' : ''}`}
                    onClick={() => changeAngle('front')}
                  >
                    Front
                  </button>
                  <button 
                    className={`camera-btn ${currentAngle === 'side' ? 'active' : ''}`}
                    onClick={() => changeAngle('side')}
                  >
                    Side
                  </button>
                  <button 
                    className={`camera-btn ${currentAngle === 'back' ? 'active' : ''}`}
                    onClick={() => changeAngle('back')}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Size Selector */}
              {currentDress.availableSizes && currentDress.availableSizes.length > 0 && (
                <div className="option-section">
                  <div className="option-label">Select Size</div>
                  <div className="size-buttons">
                    {currentDress.availableSizes.map(size => (
                      <button 
                        key={size}
                        className={`size-btn ${(selectedSize || currentDress.size) === size ? 'active' : ''}`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {currentDress.availableColors && currentDress.availableColors.length > 0 && (
                <div className="option-section">
                  <div className="option-label">Available Colors</div>
                  <div className="color-options">
                    {currentDress.availableColors.map(color => (
                      <button 
                        key={color}
                        className={`color-btn ${(selectedColor || currentDress.color) === color ? 'active' : ''}`}
                        onClick={() => handleColorChange(color)}
                      >
                        <div className="color-swatch" style={{ backgroundColor: color.toLowerCase() }}></div>
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button className="add-cart-btn-sidebar">Add to Cart</button>
            </div>

            {/* Right Arrow */}
            <div className="arrow-btn right-arrow" onClick={goToNextWrapped}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </>
        )}
      </main>



      {/* 3D Viewer Modal */}
      {viewer3DOpen && currentDress && (
        <DressViewer3D 
          dress={currentDress} 
          onClose={() => setViewer3DOpen(false)} 
        />
      )}

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-tagline">✨ Humanizing Generative AI for Fashion Content Creation</p>
          <Link href="/" className="back">← Back to Home</Link>
        </div>
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
        
        .ai-banner{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 50%, #D94C3D 100%);
          color:white;
          padding:12px 20px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          animation:slideDown 0.5s ease-out;
          box-shadow:0 2px 8px rgba(232, 93, 79, 0.2);
        }
        
        @keyframes slideDown{
          from{transform:translateY(-100%); opacity:0}
          to{transform:translateY(0); opacity:1}
        }
        
        .ai-icon{
          font-size:20px;
          animation:rotate 3s ease-in-out infinite;
        }
        
        @keyframes rotate{
          0%, 100%{transform:rotate(0deg)}
          50%{transform:rotate(15deg)}
        }
        
        .ai-text{
          margin:0;
          font-size:14px;
          font-weight:600;
          text-shadow:0 1px 3px rgba(0,0,0,0.2);
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
          animation:gradientShift 3s ease-in-out infinite;
          cursor:default;
        }
        
        @keyframes gradientShift{
          0%, 100%{filter:hue-rotate(0deg)}
          50%{filter:hue-rotate(10deg)}
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
          max-width:1600px;
          margin:0 auto;
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

        /* Canvas Container */
        .canvas-container{
          display:flex;
          flex-direction:column;
          gap:20px;
          flex:1;
          max-width:700px;
        }

        /* Main Canvas */
        .canvas{
          width:100%;
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

        /* Right Sidebar */
        .right-sidebar{
          width:350px;
          background:white;
          border-radius:16px;
          padding:24px;
          box-shadow:0 8px 32px rgba(0,0,0,0.12);
          display:flex;
          flex-direction:column;
          gap:20px;
          height:75vh;
          min-height:600px;
          overflow-y:auto;
          box-sizing:border-box;
        }

        .right-sidebar::-webkit-scrollbar{
          width:6px;
        }
        
        .right-sidebar::-webkit-scrollbar-thumb{
          background:rgba(232, 93, 79, 0.3);
          border-radius:3px;
        }
        
        .right-sidebar::-webkit-scrollbar-thumb:hover{
          background:rgba(232, 93, 79, 0.5);
        }

        .right-sidebar .dress-title{
          font-size:24px;
          font-weight:700;
          color:#111827;
          margin:0 0 8px;
        }

        .dress-description{
          font-size:14px;
          color:#6b7280;
          line-height:1.6;
          margin:-10px 0 0 0;
        }

        .dress-brand{
          display:inline-block;
          padding:6px 12px;
          background:rgba(232, 93, 79, 0.1);
          color:#E85D4F;
          border-radius:6px;
          font-size:13px;
          font-weight:600;
        }

        .price-container{
          display:flex;
          align-items:baseline;
          gap:12px;
          flex-wrap:wrap;
        }

        .dress-price{
          font-size:32px;
          font-weight:800;
          color:#111827;
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 100%);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          transition:all 0.3s ease;
        }

        .size-indicator{
          display:inline-block;
          padding:4px 12px;
          background:rgba(34, 197, 94, 0.1);
          color:#22c55e;
          border-radius:6px;
          font-size:13px;
          font-weight:600;
          animation:slideIn 0.3s ease-out;
        }

        @keyframes slideIn{
          from{opacity:0; transform:translateX(-10px)}
          to{opacity:1; transform:translateX(0)}
        }

        /* Thumbnail Gallery - Horizontal */
        .thumbnail-gallery-outside{
          display:flex;
          gap:10px;
          padding:12px 0;
          overflow-x:auto;
          overflow-y:hidden;
          align-items:center;
          flex-wrap:wrap;
          -webkit-overflow-scrolling:touch;
        }

        .thumbnail-gallery-outside::-webkit-scrollbar{
          height:6px;
        }
        
        .thumbnail-gallery-outside::-webkit-scrollbar-track{
          background:rgba(0,0,0,0.05);
          border-radius:3px;
        }
        
        .thumbnail-gallery-outside::-webkit-scrollbar-thumb{
          background:rgba(232, 93, 79, 0.5);
          border-radius:3px;
          transition:background 0.2s;
        }
        
        .thumbnail-gallery-outside::-webkit-scrollbar-thumb:hover{
          background:rgba(232, 93, 79, 0.7);
        }

        .thumbnail-box{
          position:relative;
          width:70px;
          height:90px;
          border-radius:8px;
          overflow:hidden;
          cursor:pointer;
          border:3px solid #e5e7eb;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background:#fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
          flex-shrink:0;
        }

        .thumbnail-box img{
          width:100%;
          height:100%;
          object-fit:cover;
          transition:transform 0.3s ease;
        }

        .thumbnail-box:hover img{
          transform:scale(1.1);
        }

        .thumbnail-box:hover{
          border-color:#E85D4F;
          box-shadow:0 4px 16px rgba(232, 93, 79, 0.4);
          transform:translateY(-3px);
        }

        .thumbnail-box.active{
          border-color:#E85D4F;
          border-width:3px;
          box-shadow:0 0 0 3px rgba(232, 93, 79, 0.2), 0 6px 20px rgba(232, 93, 79, 0.5);
          transform:scale(1.08);
        }

        .thumbnail-number{
          position:absolute;
          top:4px;
          left:4px;
          background:rgba(0,0,0,0.85);
          color:white;
          padding:3px 8px;
          border-radius:5px;
          font-size:12px;
          font-weight:700;
          backdrop-filter:blur(4px);
          line-height:1.3;
        }

        .thumbnail-box.active .thumbnail-number{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 100%);
        }

        /* See More Button */
        .see-more-btn{
          width:70px;
          height:90px;
          border-radius:8px;
          border:3px dashed #E85D4F;
          background:rgba(232, 93, 79, 0.05);
          cursor:pointer;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:4px;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight:700;
          color:#E85D4F;
          flex-shrink:0;
          position:relative;
        }

        .see-more-btn span{
          font-size:18px;
          font-weight:800;
        }

        .see-more-text{
          font-size:11px;
          text-transform:uppercase;
          letter-spacing:0.5px;
        }

        .see-more-btn:hover{
          background:rgba(232, 93, 79, 0.1);
          border-color:#D94C3D;
          transform:translateY(-3px);
          box-shadow:0 4px 16px rgba(232, 93, 79, 0.3);
        }

        .see-more-btn:active{
          transform:translateY(-1px);
        }

        .see-more-btn svg{
          margin-top:-2px;
        }

        .option-section{
          display:flex;
          flex-direction:column;
          gap:10px;
          box-sizing:border-box;
        }

        .option-label{
          font-size:13px;
          font-weight:600;
          color:#374151;
          text-transform:uppercase;
          letter-spacing:0.5px;
        }

        .camera-buttons,
        .size-buttons{
          display:flex;
          gap:8px;
          flex-wrap:wrap;
        }

        .camera-btn,
        .size-btn{
          flex:1;
          padding:10px 16px;
          background:#f9fafb;
          border:2px solid #e5e7eb;
          border-radius:8px;
          font-size:14px;
          font-weight:500;
          color:#374151;
          cursor:pointer;
          transition:all 0.2s ease;
          box-sizing:border-box;
        }

        .camera-btn:hover,
        .size-btn:hover{
          background:#fff;
          border-color:#E85D4F;
          transform:translateY(-1px);
        }

        .camera-btn.active,
        .size-btn.active{
          background:linear-gradient(135deg, #E85D4F 0%, #F47C3C 100%);
          color:white;
          border-color:transparent;
          box-shadow:0 2px 8px rgba(232, 93, 79, 0.3);
        }

        .color-options{
          display:flex;
          flex-direction:column;
          gap:8px;
        }

        .color-btn{
          display:flex;
          align-items:center;
          gap:12px;
          padding:12px;
          background:#f9fafb;
          border:2px solid #e5e7eb;
          border-radius:8px;
          font-size:14px;
          font-weight:500;
          color:#374151;
          cursor:pointer;
          transition:all 0.2s ease;
          box-sizing:border-box;
        }

        .color-btn:hover{
          background:#fff;
          border-color:#E85D4F;
          transform:translateX(3px);
        }

        .color-btn.active{
          background:#fff;
          border-color:#E85D4F;
          box-shadow:0 2px 8px rgba(232, 93, 79, 0.2);
        }

        .color-swatch{
          width:24px;
          height:24px;
          border-radius:50%;
          border:2px solid rgba(0,0,0,0.1);
          flex-shrink:0;
        }

        .add-cart-btn-sidebar{
          width:100%;
          padding:16px 20px;
          background:#111827;
          color:white;
          border:none;
          border-radius:10px;
          font-size:15px;
          font-weight:600;
          cursor:pointer;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top:auto;
          box-sizing:border-box;
        }

        .add-cart-btn-sidebar:hover{
          background:#000;
          transform:translateY(-2px);
          box-shadow:0 6px 20px rgba(0,0,0,0.3);
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

        /* Progress Indicator */
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

        .footer{
          padding:30px 20px; 
          text-align:center; 
          background:linear-gradient(135deg, #f9fafb 0%, #ffffff 100%); 
          border-top:2px solid #e5e7eb;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .footer:hover{
          border-top-color:#E85D4F;
          box-shadow:0 -4px 12px rgba(232, 93, 79, 0.1);
        }
        
        .footer-content{
          display:flex;
          flex-direction:column;
          gap:12px;
          align-items:center;
        }
        
        .footer-tagline{
          font-size:14px;
          color:#6b7280;
          font-weight:500;
          margin:0;
          font-style:italic;
          animation:fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn{
          from{opacity:0}
          to{opacity:1}
        }
        
        .back{
          color:#111827; 
          text-decoration:none; 
          font-weight:600; 
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display:inline-block;
          padding:8px 16px;
          border-radius:8px;
          background:rgba(232, 93, 79, 0.05);
        }
        
        .back:hover{
          color:#E85D4F;
          transform:translateX(-4px);
          background:rgba(232, 93, 79, 0.1);
        }

        /* Responsive */
        /* Tablet (Portrait & Landscape) */
        @media (max-width:1200px){
          .hero{
            padding:20px 15px;
            gap:16px;
          }
          
          .canvas-container{
            max-width:700px;
          }
          
          .right-sidebar{
            width:320px;
            padding:24px;
          }
          
          .dress-title{font-size:26px}
          .dress-price{font-size:30px}
        }
        
        @media (max-width:900px){
          .nav{
            flex-direction:column; 
            align-items:stretch; 
            gap:12px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .nav-left{justify-content:stretch}
          .nav-left .search{width:100%}
          .nav-items{justify-content:center; flex-wrap:wrap}
          
          .ai-banner{
            padding:12px 15px;
            font-size:13px;
          }
          
          .ai-icon{font-size:18px}
          
          .ai-text{font-size:13px}
          
          .hero{
            flex-direction:column;
            padding:20px 12px;
            gap:20px;
          }
          
          .arrow-btn{
            width:54px; 
            height:54px;
            position:absolute;
            top:calc(50% - 40px);
            z-index:30;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .left-arrow{left:8px}
          .right-arrow{right:8px}
          
          .canvas-container{
            width:100%;
            max-width:100%;
          }
          
          .canvas{
            width:100%;
            height:65vh; 
            min-height:480px;
            transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .thumbnail-gallery-outside{
            margin-top:12px;
            padding:0 8px;
          }
          
          .right-sidebar{
            width:100%;
            max-width:100%;
            height:auto;
            max-height:none;
            padding:24px 20px;
            padding-right:20px;
            box-sizing:border-box;
          }
          
          .dress-title{font-size:24px}
          .dress-price{font-size:28px}
          
          .camera-buttons,
          .size-buttons{
            gap:10px;
          }
          
          .camera-btn,
          .size-btn{
            min-width:80px;
            padding:12px 16px;
            font-size:14px;
          }
          
          .color-btn{
            padding:14px;
            font-size:14px;
          }
          
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

        /* Mobile Landscape */
        @media (max-width:768px){
          .hero{
            padding:16px 15px;
            gap:16px;
          }
          
          .arrow-btn{
            width:48px;
            height:48px;
            top:calc(50% - 50px);
          }
          
          .left-arrow{left:10px}
          .right-arrow{right:10px}
          
          .canvas{
            height:60vh;
            min-height:450px;
          }
          
          .thumbnail-gallery-outside{
            gap:8px;
            padding:0 6px;
            justify-content:flex-start;
          }
          
          .thumbnail-box{
            width:65px;
            height:85px;
          }
          
          .see-more-btn{
            width:65px;
            height:85px;
          }
          
          .right-sidebar{
            padding:20px 16px;
          }
          
          .dress-title{font-size:22px}
          .dress-price{font-size:26px}
          
          .size-indicator{
            font-size:12px;
            padding:3px 10px;
          }
          
          .camera-buttons{
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:8px;
          }
          
          .size-buttons{
            display:grid;
            grid-template-columns:repeat(3, 1fr);
            gap:8px;
          }
          
          .camera-btn,
          .size-btn{
            padding:10px 12px;
            font-size:13px;
            min-width:0;
            white-space:nowrap;
            font-weight:600;
          }
          
          .color-btn{
            padding:10px;
            font-size:12px;
            gap:8px;
          }
          
          .add-cart-btn-sidebar{
            padding:12px 16px;
            font-size:14px;
            margin-top:16px;
            width:100%;
            max-width:100%;
          }
        }
        
        /* Mobile Portrait */
        @media (max-width:600px){
          .nav{
            padding:12px 16px;
          }
          
          .logo-text{
            font-size:20px;
          }
          
          .ai-banner{
            padding:10px 16px;
          }
          
          .ai-text{
            font-size:12px;
          }
          
          .hero{
            padding:12px 12px;
            gap:12px;
          }
          
          .arrow-btn{
            width:44px; 
            height:44px;
            top:calc(50% - 60px);
          }
          
          .arrow-btn:hover{
            transform:scale(1.05);
          }
          
          .left-arrow{left:8px}
          .right-arrow{right:8px}
          
          .canvas{
            height:58vh; 
            min-height:420px;
            max-height:600px; 
            border-radius:12px;
          }
          
          .dress-display{
            border-radius:12px;
          }
          
          .main-dress-img{
            border-radius:12px;
            object-fit:contain;
          }
          
          .angle-widget{
            top:8px;
            right:8px;
            padding:6px;
            border-radius:6px;
            font-size:11px;
          }
          
          .progress-indicator{
            top:8px;
            left:8px;
            padding:6px 12px;
            font-size:11px;
            border-radius:15px;
          }

          .canvas-container{
            max-width:100%;
            width:100%;
            padding:0 4px;
          }

          .thumbnail-gallery-outside{
            gap:8px;
            overflow-x:auto;
            overflow-y:hidden;
            flex-wrap:nowrap;
            padding:8px 8px;
            -webkit-overflow-scrolling:touch;
            scrollbar-width:thin;
            scrollbar-color:rgba(232, 93, 79, 0.5) transparent;
          }
          
          .thumbnail-gallery-outside::-webkit-scrollbar{
            height:4px;
          }
          
          .thumbnail-gallery-outside::-webkit-scrollbar-track{
            background:rgba(0,0,0,0.05);
            border-radius:2px;
          }
          
          .thumbnail-gallery-outside::-webkit-scrollbar-thumb{
            background:rgba(232, 93, 79, 0.5);
            border-radius:2px;
          }
          
          .thumbnail-gallery-outside::-webkit-scrollbar-thumb:hover{
            background:rgba(232, 93, 79, 0.7);
          }

          .thumbnail-box{
            width:65px;
            height:85px;
            border-width:2px;
            flex-shrink:0;
          }

          .thumbnail-box.active{
            border-width:3px;
            transform:scale(1.08);
            box-shadow:0 4px 12px rgba(232, 93, 79, 0.3);
          }

          .thumbnail-number{
            font-size:10px;
            padding:3px 7px;
            font-weight:700;
          }

          .see-more-btn{
            width:65px;
            height:85px;
            border-width:2px;
            flex-shrink:0;
          }

          .see-more-btn span{
            font-size:16px;
          }

          .see-more-text{
            font-size:9px;
            font-weight:600;
          }

          .right-sidebar{
            width:100%;
            max-width:100%;
            height:auto;
            min-height:auto;
            max-height:none;
            padding:20px 16px;
            padding-right:16px;
            overflow-y:visible;
            overflow-x:hidden;
            box-sizing:border-box;
          }

          .dress-title{
            font-size:21px;
            margin:0 0 8px;
            line-height:1.3;
            font-weight:700;
          }
          
          .dress-brand{
            font-size:12px;
            padding:5px 12px;
          }

          .dress-description{
            font-size:13px;
            line-height:1.5;
            margin-bottom:12px;
          }
          
          .price-container{
            gap:10px;
            margin:10px 0 16px;
          }

          .dress-price{
            font-size:26px;
            font-weight:800;
          }
          
          .size-indicator{
            font-size:11px;
            padding:4px 10px;
            font-weight:700;
          }

          .option-section{
            gap:8px;
            margin-bottom:16px;
          }

          .option-label{
            font-size:12px;
            margin-bottom:8px;
            font-weight:700;
            letter-spacing:0.5px;
          }
          
          .camera-buttons{
            grid-template-columns:1fr 1fr;
            gap:8px;
            margin-bottom:12px;
          }
          
          .size-buttons{
            grid-template-columns:repeat(3, 1fr);
            gap:8px;
            margin-bottom:12px;
          }

          .camera-btn,
          .size-btn{
            padding:10px 10px;
            font-size:12px;
            border-radius:6px;
            min-width:0;
            white-space:nowrap;
            font-weight:600;
            letter-spacing:0.3px;
          }

          .color-btn{
            padding:10px;
            font-size:12px;
            gap:10px;
          }

          .color-swatch{
            width:20px;
            height:20px;
          }

          .add-cart-btn-sidebar{
            padding:12px 16px;
            font-size:13px;
            border-radius:8px;
            margin-top:16px;
            width:100%;
            max-width:100%;
            box-sizing:border-box;
          }
          
          .footer{
            padding:20px 16px;
          }
          
          .footer-tagline{
            font-size:12px;
          }
        }
        
        /* Extra Small Devices (very small phones) */
        @media (max-width:400px){
          .nav{
            padding:10px 12px;
          }
          
          .ai-banner{
            padding:8px 12px;
          }
          
          .hero{
            padding:10px 10px;
          }
          
          .canvas{
            height:52vh;
            min-height:380px;
            max-height:500px;
          }
          
          .arrow-btn{
            width:40px;
            height:40px;
          }
          
          .left-arrow{left:6px}
          .right-arrow{right:6px}
          
          .thumbnail-gallery-outside{
            gap:6px;
            padding:6px 6px;
          }
          
          .thumbnail-box,
          .see-more-btn{
            width:58px;
            height:75px;
          }
          
          .right-sidebar{
            width:100%;
            max-width:100%;
            padding:16px 12px;
            padding-right:12px;
            box-sizing:border-box;
            overflow-x:hidden;
          }
          
          .dress-title{
            font-size:19px;
          }
          
          .dress-price{
            font-size:24px;
          }
          
          .add-cart-btn-sidebar{
            padding:11px 14px;
            font-size:12px;
            margin-top:14px;
            width:100%;
            max-width:100%;
          }
          
          .camera-buttons{
            grid-template-columns:1fr 1fr;
            gap:6px;
          }
          
          .size-buttons{
            grid-template-columns:repeat(3, 1fr);
            gap:6px;
          }
          
          .camera-btn,
          .size-btn{
            padding:9px 8px;
            font-size:11px;
            font-weight:600;
          }
          
          .color-btn{
            padding:9px;
            font-size:11px;
            gap:8px;
          }
          
          .color-swatch{
            width:18px;
            height:18px;
          }
        }
        
        /* Tablet Landscape Improvements */
        @media (min-width:769px) and (max-width:1024px){
          .hero{
            flex-direction:row;
            gap:20px;
          }
          
          .canvas-container{
            flex:1.2;
          }
          
          .canvas{
            height:70vh;
            min-height:500px;
          }
          
          .right-sidebar{
            width:340px;
            height:auto;
            max-height:70vh;
          }
          
          .thumbnail-gallery-outside{
            overflow-x:auto;
            flex-wrap:nowrap;
            gap:10px;
            padding:10px 8px;
          }
          
          .thumbnail-box,
          .see-more-btn{
            flex-shrink:0;
          }
          
          .camera-buttons{
            grid-template-columns:1fr 1fr;
            gap:10px;
          }
          
          .size-buttons{
            grid-template-columns:repeat(auto-fit, minmax(65px, 1fr));
            gap:10px;
          }
        }
      `}</style>
    </div>
  )
}
