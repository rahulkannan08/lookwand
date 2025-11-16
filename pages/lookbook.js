import Link from 'next/link'
import { useState, useEffect } from 'react'

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
    price: '$79',
    description: 'Light and breezy summer dress',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['White', 'Beige', 'Light Blue', 'Mint'],
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
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Floral Pink', 'Floral Blue', 'Floral Yellow'],
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
    size: 'L', 
    color: 'Navy', 
    price: '$209',
    description: 'Professional navy suit dress',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Navy', 'Black', 'Charcoal', 'Grey'],
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
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Grey', 'Black', 'Navy'],
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
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Navy', 'Black', 'White', 'Grey'],
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
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Black', 'Brown', 'Dark Brown'],
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
    availableSizes: ['2T', '3T', '4T', '5T', '6', '7'],
    availableColors: ['Blue', 'Black', 'Light Wash'],
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

// Custom background patterns
const BACKGROUNDS = [
  { id: 1, name: 'Gradient Wave', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', pattern: 'wave' },
  { id: 2, name: 'Sunset Glow', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', pattern: 'dots' },
  { id: 3, name: 'Ocean Blue', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', pattern: 'grid' },
  { id: 4, name: 'Rose Gold', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', pattern: 'diagonal' },
  { id: 5, name: 'Midnight', gradient: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)', pattern: 'stars' },
  { id: 6, name: 'Minimal White', gradient: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)', pattern: 'none' },
  { id: 7, name: 'Custom Color', gradient: '', pattern: 'none', isCustom: true },
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
  const [backgroundId, setBackgroundId] = useState(1)
  const [customColor, setCustomColor] = useState('#667eea')
  const [showColorPicker, setShowColorPicker] = useState(false)

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
  const currentBackground = BACKGROUNDS.find(bg => bg.id === backgroundId)
  const activeBackground = currentBackground?.isCustom 
    ? { ...currentBackground, gradient: customColor } 
    : currentBackground

  // Handle ESC key to close color picker
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showColorPicker) {
        setShowColorPicker(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showColorPicker])

  // Auto-select custom background when color changes
  useEffect(() => {
    if (showColorPicker && backgroundId !== 7) {
      setBackgroundId(7)
    }
  }, [customColor, showColorPicker])



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

  // Navigate between different dresses
  const goToPreviousWrapped = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? filteredDresses.length - 1 : prev - 1))
    setSelectedImageIndex(0)
    setTimeout(() => setImageLoading(false), 300)
  }

  const goToNextWrapped = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev === filteredDresses.length - 1 ? 0 : prev + 1))
    setSelectedImageIndex(0)
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
      {/* Animated AI Info Banner */}
      <div className="ai-banner">
        <svg className="ai-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9"/>
        </svg>
        <p className="ai-text">AI-Powered Fashion Showcase • Interactive 360° Views • Virtual Try-On</p>
        <svg className="ai-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a10 10 0 0 0 0 20 4 4 0 0 1 0-8 10 10 0 0 0 0-12z"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="12" cy="8" r="1" fill="currentColor"/>
        </svg>
      </div>
      

      {/* Redesigned Header - Logo on Top, Horizontal Filter Navigation */}
      <header className="topbar">
        {/* Logo Section */}
        <div className="logo-section">
          {/* Home Button - Left */}
          <Link href="/" className="home-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Link>

          {/* Logo - Center */}
          <div className="logo-wrapper">
            <svg className="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 40 Q30 20 50 20 Q70 20 70 40 L70 70 Q70 85 55 85 L45 85 Q30 85 30 70 Z" fill="currentColor" opacity="0.9"/>
              <path d="M30 40 L70 40" stroke="white" strokeWidth="2"/>
              <circle cx="42" cy="55" r="2" fill="white"/>
              <circle cx="58" cy="55" r="2" fill="white"/>
            </svg>
            <div className="logo-text-container">
              <span className="logo-text">LOOKBOOKgen</span>
              <span className="logo-subtitle">HUMANIZING GENERATIVE AI</span>
            </div>
          </div>
          
          {/* Catalog Button - Right */}
          <Link href="/catalog" className="catalog-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Catalog
          </Link>
        </div>

        {/* Horizontal Category Filter Bar with Scroll */}
        <nav className="filter-nav">
          <button 
            className="filter-scroll-btn left" 
            onClick={() => {
              const nav = document.querySelector('.filter-items-wrapper')
              nav.scrollBy({ left: -200, behavior: 'smooth' })
            }}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="filter-items-wrapper">
            <ul className="filter-items">
              <li className={brandFilter === 'all' && categoryFilter === 'all' ? 'active' : ''} onClick={() => { handleFilterChange('brand', 'all'); handleFilterChange('category', 'all') }}>
                <svg className="filter-emoji" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9"/>
                </svg>
                All
              </li>
              {brands.filter(b => b !== 'all').map(brand => (
                <li key={brand} className={brandFilter === brand ? 'active' : ''} onClick={() => { handleFilterChange('brand', brand); handleFilterChange('category', 'all') }}>
                  {brand}
                </li>
              ))}
              <li className="filter-divider"></li>
              <li className={categoryFilter === 'men' ? 'active' : ''} onClick={() => { handleFilterChange('category', 'men'); handleFilterChange('brand', 'all') }}>
                Men
              </li>
              <li className={categoryFilter === 'women' ? 'active' : ''} onClick={() => { handleFilterChange('category', 'women'); handleFilterChange('brand', 'all') }}>
                Women
              </li>
              <li className={categoryFilter === 'kids' ? 'active' : ''} onClick={() => { handleFilterChange('category', 'kids'); handleFilterChange('brand', 'all') }}>
                Kids
              </li>
            </ul>
          </div>

          <button 
            className="filter-scroll-btn right" 
            onClick={() => {
              const nav = document.querySelector('.filter-items-wrapper')
              nav.scrollBy({ left: 200, behavior: 'smooth' })
            }}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </nav>
      </header>

      <main className="hero">
        {filteredDresses.length === 0 ? (
          <div className="no-results">
            <svg className="no-results-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            <p>No items found matching your filters.</p>
            <button className="reset-btn" onClick={() => { setCategoryFilter('all'); setBrandFilter('all'); setSizeFilter('all'); setSearchQuery(''); setCurrentIndex(0) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}>
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Main Content Area with Custom Background */}
            <div className="content-wrapper">
              {/* Background Selector */}
              <div className="background-selector">
                <div className="bg-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a10 10 0 0 0 0 20 4 4 0 0 1 0-8 10 10 0 0 0 0-12z"/>
                    <circle cx="8" cy="12" r="1"/>
                    <circle cx="12" cy="8" r="1"/>
                    <circle cx="16" cy="12" r="1"/>
                  </svg>
                  Background:
                </div>
                <div className="bg-options">
                  {BACKGROUNDS.map(bg => (
                    <div
                      key={bg.id}
                      className={`bg-option ${backgroundId === bg.id ? 'active' : ''} ${bg.isCustom ? 'custom-color-option' : ''}`}
                      style={{ background: bg.isCustom ? customColor : bg.gradient }}
                      onClick={() => {
                        console.log('Background clicked:', bg.name, 'isCustom:', bg.isCustom)
                        setBackgroundId(bg.id)
                        if (bg.isCustom) {
                          console.log('Opening color picker')
                          setShowColorPicker(prev => !prev)
                        } else {
                          setShowColorPicker(false)
                        }
                      }}
                      title={bg.name}
                    >
                      {bg.isCustom ? (
                        <span className="color-picker-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 2a10 10 0 0 0 0 20 4 4 0 0 1 0-8 10 10 0 0 0 0-12z"/>
                          </svg>
                        </span>
                      ) : (
                        backgroundId === bg.id && <span className="bg-check">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Container with Dynamic Background */}
              <div className="main-display-area">
                <div className="canvas-container" style={{ background: activeBackground.gradient }}>
                  <div className={`background-pattern pattern-${currentBackground.pattern}`}></div>
                  
                  {/* Left Arrow */}
                  <div className="arrow-btn left-arrow" onClick={goToPreviousWrapped}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                  
                  {/* Main Canvas */}
                  <div className="canvas">
                    <div className={`dress-display ${imageLoading ? 'loading' : ''}`}>
                      <img 
                        src={getCurrentImage()} 
                        alt={`${currentDress.name} - view ${selectedImageIndex + 1}`}
                        className="main-dress-img"
                        style={{ 
                          filter: getColorFilter(), 
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                        }}
                      />

                      {/* Enhanced Progress indicator */}
                      <div className="progress-indicator">
                        <span className="progress-number">{currentIndex + 1}</span>
                        <span className="progress-separator">/</span>
                        <span className="progress-total">{filteredDresses.length}</span>
                      </div>


                    </div>
                  </div>

                  {/* Enhanced Carousel Thumbnail Gallery */}
                  <div className="carousel-wrapper">
                    <div className="carousel-header">
                      <span className="carousel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'6px'}}>
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        All Poses & Angles
                      </span>
                      <button 
                        className="carousel-toggle"
                        onClick={() => setShowAllThumbnails(!showAllThumbnails)}
                      >
                        {showAllThumbnails ? '▼ Show Less' : `▶ Show All (${getAllImages(currentDress).length})`}
                      </button>
                    </div>
                    
                    <div className={`thumbnail-carousel ${showAllThumbnails ? 'expanded' : ''}`}>
                      {(() => {
                        const allImages = getAllImages(currentDress)
                        const visibleCount = showAllThumbnails ? allImages.length : Math.min(6, allImages.length)

                        return allImages.slice(0, visibleCount).map((imageData, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${selectedImageIndex === index ? 'active' : ''}`}
                          onClick={() => handleThumbnailClick(index, imageData)}
                        >
                          <img src={imageData.url} alt={`Pose ${index + 1}`} />
                          <div className="carousel-overlay">
                            <span className="carousel-number">#{index + 1}</span>
                          </div>
                          {selectedImageIndex === index && (
                            <div className="carousel-active-ring"></div>
                          )}
                        </div>
                      ))
                    })()}
                  </div>
                </div>
                
                {/* Right Arrow */}
                <div className="arrow-btn right-arrow" onClick={goToNextWrapped}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              {/* Enhanced Right Sidebar */}
              <div className="right-sidebar">
                <div className="sidebar-header">
                  <h2 className="dress-title">
                    {currentDress.name}
                    <svg className="title-sparkle" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9"/>
                    </svg>
                  </h2>
                  <div className="dress-brand-badge">{currentDress.brand}</div>
                </div>

                <p className="dress-description">{currentDress.description}</p>

                <div className="price-section">
                  <div className="price-container">
                    <span className="price-label">Price:</span>
                    <div className="dress-price">{currentPrice || currentDress.price}</div>
                  </div>
                  {selectedSize && (
                    <div className="size-indicator">
                      <svg className="size-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:'6px'}}>
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18M9 3v18"/>
                      </svg>
                      Size: {selectedSize}
                    </div>
                  )}
                  {selectedColor && selectedColor !== currentDress.color && (
                    <div className="color-indicator">
                      <svg className="color-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:'6px'}}>
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="8" cy="12" r="1" fill="currentColor"/>
                        <circle cx="12" cy="8" r="1" fill="currentColor"/>
                        <circle cx="16" cy="12" r="1" fill="currentColor"/>
                      </svg>
                      Color: {selectedColor}
                    </div>
                  )}
                </div>

                {/* Camera View Selector */}
                <div className="option-section">
                  <div className="option-label">
                    <svg className="label-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    Camera Angle
                  </div>
                  <div className="camera-buttons">
                    <button 
                      className={`camera-btn ${currentAngle === 'front' ? 'active' : ''}`}
                      onClick={() => changeAngle('front')}
                    >
                      <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      Front
                    </button>
                    <button 
                      className={`camera-btn ${currentAngle === 'side' ? 'active' : ''}`}
                      onClick={() => changeAngle('side')}
                    >
                      <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="17 11 12 6 7 11"/>
                        <polyline points="7 13 12 18 17 13"/>
                      </svg>
                      Side
                    </button>
                    <button 
                      className={`camera-btn ${currentAngle === 'back' ? 'active' : ''}`}
                      onClick={() => changeAngle('back')}
                    >
                      <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                      Back
                    </button>
                  </div>
                </div>

                {/* Size Selector */}
                {currentDress.availableSizes && currentDress.availableSizes.length > 0 && (
                  <div className="option-section">
                    <div className="option-label">
                      <svg className="label-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18M9 3v18M3 15h18M15 3v18"/>
                      </svg>
                      Select Size
                    </div>
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
                    <div className="option-label">
                      <svg className="label-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12h8M10 8h4M10 16h4"/>
                      </svg>
                      Available Colors
                    </div>
                    <div className="color-options">
                      {currentDress.availableColors.map((color, index) => (
                        <button 
                          key={index}
                          className={`color-swatch ${(selectedColor || currentDress.color) === color ? 'active' : ''}`}
                          style={{ 
                            background: color === 'Multicolor' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' : color 
                          }}
                          onClick={() => handleColorChange(color)}
                          title={color}
                        >
                          {(selectedColor || currentDress.color) === color && <span className="color-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <button className="add-cart-btn-sidebar">
                  <svg className="cart-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Add to Cart
                  <span className="cart-arrow">→</span>
                </button>

                {/* Quick Actions */}
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px'}}>
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Wishlist
                  </button>
                  <button className="quick-action-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px'}}>
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-sparkles">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block'}}>
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9"/>
            </svg>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" style={{display:'inline-block',margin:'0 8px'}}>
              <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block'}}>
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9"/>
            </svg>
          </div>
          <p className="footer-tagline">Humanizing Generative AI for Fashion Content Creation</p>
          <Link href="/" className="back">
            <span className="back-arrow">←</span> Back to Home
          </Link>
        </div>
      </footer>

      {/* Color Picker Modal - Portal Level */}
      {showColorPicker && (
        <>
          <div className="color-picker-overlay" onClick={() => setShowColorPicker(false)} />
          <div className="color-picker-modal">
            <div className="color-picker-header">
              <span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline-block',verticalAlign:'middle',marginRight:'8px'}}>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a10 10 0 0 0 0 20 4 4 0 0 1 0-8 10 10 0 0 0 0-12z"/>
                  <circle cx="8" cy="12" r="1" fill="currentColor"/>
                  <circle cx="12" cy="8" r="1" fill="currentColor"/>
                  <circle cx="16" cy="12" r="1" fill="currentColor"/>
                </svg>
                Choose Your Color
              </span>
              <button className="close-picker" onClick={() => setShowColorPicker(false)}>✕</button>
            </div>
            <div className="color-picker-content">
              <div className="color-wheel-section">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="color-input"
                />
                <div className="color-preview" style={{ background: customColor }}>
                  <span className="preview-label">Preview</span>
                </div>
              </div>
              <div className="color-code-section">
                <label className="code-label">Color Code:</label>
                <input
                  type="text"
                  value={customColor.toUpperCase()}
                  onChange={(e) => {
                    let value = e.target.value.toUpperCase()
                    if (!value.startsWith('#')) {
                      value = '#' + value
                    }
                    if (value.match(/^#[0-9A-F]{0,6}$/)) {
                      setCustomColor(value)
                    }
                  }}
                  onBlur={(e) => {
                    const value = customColor
                    if (value.length < 7) {
                      setCustomColor(value.padEnd(7, '0'))
                    }
                  }}
                  className="color-hex-input"
                  placeholder="#667EEA"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="color-presets">
              <div className="presets-label">Quick Colors:</div>
              <div className="presets-grid">
                {['#667eea', '#f093fb', '#4facfe', '#fa709a', '#2c3e50', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f38181', '#aa96da', '#fcbad3', '#a8e6cf', '#ffeaa7', '#fd79a8', '#fdcb6e', '#e17055'].map(color => (
                  <div
                    key={color}
                    className="preset-color"
                    style={{ background: color }}
                    onClick={() => setCustomColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <button className="apply-color-btn" onClick={() => setShowColorPicker(false)}>
              Apply Color
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        * { 
          -webkit-tap-highlight-color: transparent;
          scroll-behavior: smooth;
        }

        html {
          overflow-x: hidden;
        }

        body {
          overscroll-behavior: none;
        }
        
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes rotate360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .page-root { 
          min-height: 100vh; 
          display: flex; 
          flex-direction: column; 
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
          padding-bottom: 0;
          overflow-x: hidden;
        }
        
        .ai-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
          color: white;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          position: sticky;
          top: 0;
          z-index: 101;
        }
        
        .ai-icon {
          font-size: 24px;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .ai-text {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          letter-spacing: 0.5px;
        }
        
        .topbar {
          position: sticky; 
          top: 0; 
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
          z-index: 100;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        
        .topbar:hover {
          box-shadow: 0 6px 25px rgba(0,0,0,0.15);
        }
        
        /* Logo Section */
        .logo-section {
          padding: 16px 24px 12px;
          border-bottom: 1px solid rgba(102, 126, 234, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        
        /* Home Button - Left */
        .home-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .home-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .home-btn svg {
          transition: transform 0.3s ease;
        }
        
        .home-btn:hover svg {
          transform: translateX(-2px);
        }
        
        /* Logo - Center */
        .logo-wrapper {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.3s ease;
        }
        
        .logo-wrapper:hover {
          transform: translateX(-50%) scale(1.05);
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          color: #667eea;
          animation: float 3s ease-in-out infinite;
        }
        
        .logo-text-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        
        .logo-subtitle {
          font-size: 9px;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 1px;
          text-transform: uppercase;
          line-height: 1;
        }
        
        /* Catalog Button - Right */
        .catalog-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          position: absolute;
          right: 24px;
        }
        
        .catalog-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }
        
        .catalog-btn svg {
          width: 18px;
          height: 18px;
        }
        
        /* Horizontal Filter Navigation */
        .filter-nav {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 8px;
          background: white;
        }
        
        .filter-items-wrapper {
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
          flex: 1;
        }
        
        .filter-items-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .filter-items {
          list-style: none; 
          display: flex; 
          gap: 10px; 
          margin: 0; 
          padding: 12px 16px;
          white-space: nowrap;
        }
        
        .filter-items li {
          padding: 10px 20px;
          border-radius: 12px;
          background: #f8f9fa; 
          cursor: pointer; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          text-transform: capitalize; 
          font-weight: 600; 
          font-size: 14px; 
          user-select: none;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        
        .filter-emoji {
          font-size: 16px;
        }
        
        .filter-items li:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border-color: #667eea; 
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        
        .filter-items li.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: #fff; 
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }
        
        .filter-divider {
          width: 2px;
          height: 24px;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 2px;
          cursor: default !important;
          padding: 0 !important;
          margin: 0 4px;
        }
        
        .filter-divider:hover {
          transform: none !important;
          background: rgba(102, 126, 234, 0.2) !important;
          box-shadow: none !important;
        }
        
        /* Scroll Buttons */
        .filter-scroll-btn {
          position: relative;
          background: white;
          border: 2px solid #667eea;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
          flex-shrink: 0;
          margin: 0 4px;
        }
        
        .filter-scroll-btn:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .filter-scroll-btn:hover svg {
          stroke: white;
        }
        
        .filter-scroll-btn svg {
          stroke: #667eea;
          transition: stroke 0.3s ease;
        }
        
        .filter-scroll-btn.left {
          margin-left: 8px;
        }
        
        .filter-scroll-btn.right {
          margin-right: 8px;
        }

        .hero {
          flex: 1; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 30px 20px; 
          gap: 24px; 
          position: relative;
          max-width: 1800px;
          margin: 0 auto;
          width: 100%;
        }
        
        .canvas-container > .arrow-btn:hover {
          transform: translateY(-50%) scale(1.15);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4), 0 0 0 3px rgba(102, 126, 234, 0.3);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: rgba(255,255,255,0.5);
        }
        
        .canvas-container > .arrow-btn:active {
          transform: translateY(-50%) scale(1.05);
        }

        .canvas-container > .arrow-btn svg {
          width: 32px;
          height: 32px;
          stroke-width: 3;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          max-width: 1400px;
          width: 100%;
          position: relative;
        }
        
        .main-display-area {
          display: flex;
          gap: 24px;
          width: 100%;
          align-items: stretch;
          min-height: 100%;
        }

        .background-selector {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: relative;
        }

        .bg-label {
          font-size: 15px;
          font-weight: 700;
          color: #374151;
        }

        .bg-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .bg-option {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid transparent;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .bg-option:hover {
          transform: scale(1.15) translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .bg-option.active {
          border-color: #fff;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3), 0 6px 20px rgba(0,0,0,0.3);
          transform: scale(1.15);
        }

        .bg-check {
          font-size: 20px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          font-weight: 900;
        }

        .custom-color-option {
          position: relative;
          overflow: hidden;
          border: 3px solid white;
          background: conic-gradient(from 0deg, 
            #ff0000 0deg, 
            #ff8800 45deg, 
            #ffff00 90deg, 
            #00ff00 135deg, 
            #00ffff 180deg, 
            #0088ff 225deg, 
            #8800ff 270deg, 
            #ff00ff 315deg, 
            #ff0000 360deg) !important;
        }

        .custom-color-option::after {
          content: '';
          position: absolute;
          inset: 30%;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .custom-color-option:hover {
          transform: scale(1.15) translateY(-3px);
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5), 0 6px 20px rgba(0,0,0,0.3);
        }

        .color-picker-icon {
          position: relative;
          z-index: 2;
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
          animation: colorPulse 2s ease-in-out infinite;
        }

        @keyframes colorPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .color-picker-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 9998;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .color-picker-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          z-index: 9999;
          min-width: 420px;
          max-width: 90vw;
          animation: slideInModal 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideInModal {
          from { 
            opacity: 0; 
            transform: translate(-50%, -45%);
          }
          to { 
            opacity: 1; 
            transform: translate(-50%, -50%);
          }
        }

        .color-picker-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e5e7eb;
        }

        .color-picker-header span {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
        }

        .close-picker {
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .close-picker:hover {
          background: #f3f4f6;
          color: #1f2937;
        }

        .color-picker-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .color-wheel-section {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .color-input {
          width: 120px;
          height: 120px;
          border: 4px solid #ffffff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2), inset 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          outline: none;
        }

        .color-input::-webkit-color-swatch-wrapper {
          padding: 0;
          border-radius: 50%;
        }

        .color-input::-webkit-color-swatch {
          border: none;
          border-radius: 50%;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.15);
        }

        .color-input::-moz-color-swatch {
          border: none;
          border-radius: 50%;
        }

        .color-input:hover {
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25), inset 0 2px 8px rgba(0,0,0,0.1), 0 0 0 4px rgba(102, 126, 234, 0.2);
        }

        .color-input:active {
          transform: scale(1.02);
        }

        .color-preview {
          flex: 1;
          height: 120px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15), inset 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 12px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .color-preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          opacity: 0.3;
          z-index: 0;
        }

        .preview-label {
          position: relative;
          z-index: 1;
          color: white;
          font-weight: 600;
          font-size: 14px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
          background: rgba(0,0,0,0.2);
          padding: 6px 16px;
          border-radius: 8px;
          backdrop-filter: blur(4px);
        }

        .color-code-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .code-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .color-hex-input {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          font-family: 'Courier New', monospace;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .color-hex-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .color-presets {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
          margin-bottom: 20px;
        }

        .presets-label {
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .presets-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 10px;
        }

        .preset-color {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 3px solid transparent;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .preset-color:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          border-color: rgba(255,255,255,0.6);
        }

        .apply-color-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }

        .apply-color-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
        }

        .apply-color-btn:active {
          transform: translateY(0);
        }

        .canvas-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          position: relative;
          border-radius: 24px;
          padding: 30px;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: visible;
        }
        
        /* Position arrows relative to canvas-container */
        .canvas-container > .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 70px; 
          height: 70px; 
          background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,250,0.98) 100%);
          backdrop-filter: blur(10px);
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          box-shadow: 0 8px 25px rgba(0,0,0,0.25), 0 0 0 2px rgba(102, 126, 234, 0.15); 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: #667eea;
          z-index: 100;
          border: 3px solid rgba(102, 126, 234, 0.3);
        }

        .canvas-container > .left-arrow {
          left: 20px;
        }

        .canvas-container > .right-arrow {
          right: 20px;
        }

        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          pointer-events: none;
        }

        .pattern-wave {
          background: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.3) 10px,
              rgba(255,255,255,0.3) 20px
            );
          animation: shimmer 20s linear infinite;
        }

        .pattern-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px);
          background-size: 30px 30px;
        }

        .pattern-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .pattern-diagonal {
          background: 
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 15px,
              rgba(255,255,255,0.2) 15px,
              rgba(255,255,255,0.2) 30px
            );
        }

        .pattern-stars {
          background-image: 
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 60% 70%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.4), transparent),
            radial-gradient(2px 2px at 90% 60%, rgba(255,255,255,0.5), transparent);
          background-size: 200% 200%;
          animation: gradientFlow 10s ease infinite;
        }

        .canvas {
          width: 100%;
          height: 600px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px; 
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          overflow: hidden;
          position: relative;
          transition: all 0.4s ease;
        }
        
        .canvas:hover {
          box-shadow: 0 15px 50px rgba(0,0,0,0.25);
          transform: translateY(-4px);
        }

        .dress-display {
          width: 100%; 
          height: 100%; 
          position: relative;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .dress-display.loading {
          opacity: 0.6;
        }

        .main-dress-img {
          width: 100%; 
          height: 100%; 
          object-fit: contain;
          display: block;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .dress-display:not(.loading):hover .main-dress-img {
          transform: scale(1.03);
        }

        .progress-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(102, 126, 234, 0.95);
          backdrop-filter: blur(10px);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 700;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .progress-number, .progress-total {
          font-size: 16px;
        }

        .progress-separator {
          opacity: 0.7;
          margin: 0 2px;
        }



        .carousel-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }

        .carousel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(102, 126, 234, 0.2);
        }

        .carousel-title {
          font-size: 16px;
          font-weight: 700;
          color: #374151;
        }

        .carousel-toggle {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .thumbnail-carousel {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 12px;
          max-height: 240px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 4px;
          transition: max-height 0.4s ease;
        }

        .thumbnail-carousel.expanded {
          max-height: 600px;
        }

        .thumbnail-carousel::-webkit-scrollbar {
          width: 8px;
        }
        
        .thumbnail-carousel::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.5);
          border-radius: 4px;
        }
        
        .thumbnail-carousel::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.7);
        }

        .carousel-item {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid transparent;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .carousel-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .carousel-item:hover img {
          transform: scale(1.1);
        }

        .carousel-item:hover {
          border-color: #667eea;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transform: translateY(-4px);
        }

        .carousel-item.active {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2), 0 8px 25px rgba(102, 126, 234, 0.5);
          transform: scale(1.05);
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%);
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .carousel-item:hover .carousel-overlay {
          opacity: 1;
        }

        .carousel-number {
          background: rgba(102, 126, 234, 0.95);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
        }

        .carousel-active-ring {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 3px solid #667eea;
          border-radius: 14px;
          animation: pulse 2s ease-in-out infinite;
        }

        .right-sidebar {
          width: 400px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: fit-content;
          min-height: 100%;
          overflow-y: visible;
        }

        .sidebar-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dress-title {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 1.3;
        }

        .title-sparkle {
          font-size: 22px;
          animation: float 2s ease-in-out infinite;
        }

        .dress-brand-badge {
          display: inline-block;
          padding: 8px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          width: fit-content;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .dress-description {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.7;
          margin: 0;
        }

        .price-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border-radius: 16px;
          border: 2px solid rgba(102, 126, 234, 0.1);
        }

        .price-container {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .price-label {
          font-size: 14px;
          color: #6b7280;
          font-weight: 600;
        }

        .dress-price {
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .size-indicator,
        .color-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          animation: slideIn 0.3s ease-out;
        }

        .color-indicator {
          background: rgba(245, 87, 108, 0.1);
          color: #f5576c;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .option-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option-label {
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .label-icon {
          font-size: 18px;
        }

        .camera-buttons,
        .size-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .camera-btn,
        .size-btn {
          flex: 1;
          min-width: 90px;
          padding: 12px 16px;
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-icon {
          font-size: 16px;
        }

        .camera-btn:hover,
        .size-btn:hover {
          background: #fff;
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .camera-btn.active,
        .size-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .color-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .color-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .color-btn:hover {
          background: #fff;
          border-color: #667eea;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .color-btn.active {
          background: #fff;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .color-swatch {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid rgba(0,0,0,0.1);
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .color-check {
          margin-left: auto;
          font-size: 18px;
          color: #667eea;
          font-weight: 900;
        }

        .add-cart-btn-sidebar {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #111827 0%, #374151 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 6px 20px rgba(17, 24, 39, 0.3);
        }

        .cart-icon {
          font-size: 20px;
          animation: bounce 2s ease-in-out infinite;
        }

        .cart-arrow {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .add-cart-btn-sidebar:hover {
          background: linear-gradient(135deg, #000 0%, #111827 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(17, 24, 39, 0.4);
        }

        .add-cart-btn-sidebar:hover .cart-arrow {
          transform: translateX(4px);
        }

        .quick-actions {
          display: flex;
          gap: 12px;
        }

        .quick-action-btn {
          flex: 1;
          padding: 12px 16px;
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .quick-action-btn:hover {
          background: #fff;
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 80px 20px;
          color: #6b7280;
        }

        .no-results-icon {
          font-size: 64px;
          animation: float 3s ease-in-out infinite;
        }

        .no-results p {
          font-size: 20px;
          margin: 0;
          font-weight: 600;
        }

        .reset-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .reset-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .footer {
          padding: 40px 20px; 
          text-align: center; 
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border-top: 3px solid rgba(102, 126, 234, 0.2);
          margin-top: 40px;
        }
        
        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .footer-sparkles {
          font-size: 24px;
          animation: float 2s ease-in-out infinite;
        }
        
        .footer-tagline {
          font-size: 15px;
          color: #6b7280;
          font-weight: 600;
          margin: 0;
          font-style: italic;
        }
        
        .back {
          color: #667eea; 
          text-decoration: none; 
          font-weight: 700; 
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          background: rgba(102, 126, 234, 0.1);
        }
        
        .back:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateX(-4px);
        }

        .back-arrow {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .back:hover .back-arrow {
          transform: translateX(-4px);
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .hero {
            gap: 20px;
            padding: 24px 16px;
          }
          
          .right-sidebar {
            width: 360px;
          }
        }

        @media (max-width: 1200px) {
          .main-display-area {
            flex-direction: column;
          }
          
          .content-wrapper {
            flex-direction: column;
          }
          
          .right-sidebar {
            width: 100%;
            max-height: none;
            position: relative;
            top: 0;
            padding: 24px;
          }
          
          .canvas-container > .arrow-btn {
            width: 60px;
            height: 60px;
          }
          
          .canvas-container > .left-arrow {
            left: 15px;
          }
          
          .canvas-container > .right-arrow {
            right: 15px;
          }

          .canvas {
            height: 550px;
          }

          .nav-items {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 900px) {
          .logo-section {
            padding: 12px 16px 10px;
          }
          
          .home-btn,
          .catalog-btn {
            padding: 8px 12px;
            font-size: 13px;
            gap: 6px;
          }
          
          .home-btn svg,
          .catalog-btn svg {
            width: 16px;
            height: 16px;
          }
          
          .logo-wrapper {
            gap: 8px;
          }
          
          .logo-icon {
            width: 32px;
            height: 32px;
          }
          
          .logo-text {
            font-size: 20px;
          }
          
          .logo-subtitle {
            font-size: 8px;
          }
          
          .logo-icon {
            font-size: 32px;
          }
          
          .logo-text {
            font-size: 24px;
          }
          
          .filter-nav {
            padding: 0 4px;
          }
          
          .filter-items {
            padding: 10px 8px;
            gap: 8px;
          }
          
          .filter-items li {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .filter-scroll-btn {
            width: 34px;
            height: 34px;
          }
          
          .filter-scroll-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .hero {
            flex-direction: column;
            padding: 12px;
            gap: 16px;
          }
          
          .canvas-container > .arrow-btn {
            width: 54px;
            height: 54px;
          }
          
          .canvas-container > .arrow-btn svg {
            width: 26px;
            height: 26px;
          }
          
          .canvas-container > .left-arrow {
            left: 12px;
          }
          
          .canvas-container > .right-arrow {
            right: 12px;
          }
          
          .canvas {
            height: 450px;
            border-radius: 16px;
          }

          .background-selector {
            padding: 12px 16px;
            gap: 12px;
          }

          .bg-options {
            gap: 8px;
            flex-wrap: wrap;
          }

          .bg-option {
            width: 45px;
            height: 45px;
          }
          
          .thumbnail-carousel {
            grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
            gap: 8px;
            padding: 12px;
          }

          .thumbnail-item {
            height: 100px;
          }
        }

        @media (max-width: 600px) {
          .ai-banner {
            padding: 12px 16px;
          }

          .ai-text {
            font-size: 11px;
            letter-spacing: 0.3px;
          }

          .ai-icon {
            font-size: 20px;
          }
          
          .logo-section {
            padding: 10px 12px 8px;
          }
          
          .home-btn {
            padding: 6px 10px;
            font-size: 12px;
            gap: 4px;
          }
          
          .home-btn svg {
            width: 14px;
            height: 14px;
          }
          
          .logo-wrapper {
            gap: 6px;
          }
          
          .logo-icon {
            width: 28px;
            height: 28px;
          }
          
          .logo-text {
            font-size: 18px;
          }
          
          .logo-subtitle {
            font-size: 7px;
          }

          .catalog-btn {
            padding: 6px 10px;
            font-size: 12px;
            gap: 4px;
          }
          
          .catalog-btn svg {
            width: 14px;
            height: 14px;
          }

          .filter-items {
            padding: 8px 6px;
            gap: 6px;
          }
          
          .filter-items li {
            padding: 8px 14px;
            font-size: 12px;
          }
          
          .filter-emoji {
            font-size: 14px;
          }
          
          .filter-scroll-btn {
            width: 32px;
            height: 32px;
            margin: 0 2px;
          }
          
          .filter-scroll-btn svg {
            width: 16px;
            height: 16px;
          }
          
          .canvas {
            height: 380px;
            border-radius: 12px;
          }
          
          .canvas-container > .arrow-btn {
            width: 48px;
            height: 48px;
          }

          .canvas-container > .arrow-btn svg {
            width: 22px;
            height: 22px;
          }
          
          .canvas-container > .left-arrow {
            left: 10px;
          }
          
          .canvas-container > .right-arrow {
            right: 10px;
          }

          .left-arrow:hover,
          .right-arrow:hover {
            transform: translateY(-50%) scale(1.08);
          }

          .left-arrow:active,
          .right-arrow:active {
            transform: translateY(-50%) scale(1.02);
          }
          
          .background-selector {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 10px 14px;
          }

          .bg-label {
            font-size: 14px;
            text-align: center;
          }
          
          .bg-options {
            justify-content: center;
            gap: 6px;
          }

          .bg-option {
            width: 42px;
            height: 42px;
          }
          
          .dress-title {
            font-size: 22px;
          }
          
          .dress-price {
            font-size: 28px;
          }

          .dress-brand {
            font-size: 13px;
          }
          
          .right-sidebar {
            padding: 16px;
          }

          .size-selector, .color-selector {
            gap: 6px;
          }

          .size-option, .color-option {
            padding: 8px 12px;
            font-size: 13px;
          }

          .progress-indicator {
            font-size: 15px;
            padding: 6px 14px;
          }

          .thumbnail-carousel {
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
            gap: 6px;
            padding: 10px;
          }

          .thumbnail-item {
            height: 90px;
            border-radius: 8px;
          }

          .color-picker-modal {
            min-width: 300px;
            padding: 18px;
            max-width: 95vw;
            border-radius: 16px;
          }

          .color-wheel-section {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .color-input {
            width: 90px;
            height: 90px;
            margin: 0 auto;
          }

          .color-preview {
            height: 70px;
          }

          .preview-label {
            font-size: 12px;
            padding: 4px 12px;
          }

          .code-label {
            font-size: 13px;
          }

          .color-hex-input {
            font-size: 16px;
            padding: 12px 16px;
          }

          .presets-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
          }

          .color-picker-header span {
            font-size: 15px;
          }

          .presets-label {
            font-size: 12px;
          }

          .apply-color-btn {
            padding: 11px 18px;
            font-size: 14px;
          }

          .footer {
            padding: 16px;
          }

          .back {
            font-size: 14px;
            padding: 10px 18px;
          }
        }

        @media (max-width: 400px) {
          .logo-section {
            padding: 8px 10px 6px;
          }
          
          .home-btn span,
          .catalog-btn span {
            display: none;
          }
          
          .home-btn,
          .catalog-btn {
            padding: 8px;
            border-radius: 10px;
          }
          
          .home-btn svg,
          .catalog-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .logo-icon {
            width: 24px;
            height: 24px;
          }
          
          .logo-text {
            font-size: 16px;
          }
          
          .logo-subtitle {
            font-size: 6px;
          }
          
          .canvas {
            height: 320px;
          }

          .canvas-container > .arrow-btn {
            width: 42px;
            height: 42px;
          }

          .canvas-container > .arrow-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .canvas-container > .left-arrow {
            left: 8px;
          }
          
          .canvas-container > .right-arrow {
            right: 8px;
          }

          .bg-option {
            width: 38px;
            height: 38px;
          }

          .thumbnail-carousel {
            grid-template-columns: repeat(auto-fill, minmax(65px, 1fr));
          }

          .thumbnail-item {
            height: 80px;
          }

          .color-picker-modal {
            padding: 16px;
          }

          .presets-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>
    </div>
  )
}
