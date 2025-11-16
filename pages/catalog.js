import Link from 'next/link'
import { useState } from 'react'

// Import DRESSES data from lookbook
const DRESSES = [
  { 
    id: 1, 
    name: 'EMBROIDERED MIDI DRESS', 
    category: 'women', 
    brand: 'Luxe', 
    price: '$79',
    description: 'Round neck midi dress with short cuff sleeves with elastic cuffs. Flounced hem. Front button closure',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Black', 'Navy', 'Burgundy'],
    images: {
      front: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1000&fit=crop',
    }
  },
  { 
    id: 2, 
    name: 'EMBROIDERED DRESS WITH BEADING', 
    category: 'women', 
    brand: 'Luxe', 
    price: '$199',
    description: 'Semi-sheer dress with round neck. Long sleeves with elastic cuffs. Contrasting embroidery detail and beading. Interior lining. Back opening',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Burgundy', 'Wine', 'Maroon'],
    images: {
      front: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    }
  },
  { 
    id: 3, 
    name: 'ELASTICIZED DRESS', 
    category: 'women', 
    brand: 'Luxe', 
    price: '$99',
    description: 'Straight neck dress with spaghetti straps. Smocked fabric with chest',
    availableSizes: ['XS', 'S', 'M'],
    availableColors: ['Emerald', 'Forest Green', 'Teal'],
    images: {
      front: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&h=1000&fit=crop',
    }
  },
  { 
    id: 4, 
    name: 'Casual Summer Dress', 
    category: 'women', 
    brand: 'Breeze', 
    price: '$89',
    description: 'Light and breezy summer dress',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['White', 'Beige', 'Light Blue'],
    images: {
      front: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
    }
  },
  { 
    id: 5, 
    name: 'Floral Midi Dress', 
    category: 'women', 
    brand: 'Garden', 
    price: '$129',
    description: 'Beautiful floral print midi dress',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Black', 'Navy', 'Burgundy'],
    images: {
      front: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop',
    }
  },
  { 
    id: 6, 
    name: 'Boho Maxi Dress', 
    category: 'women', 
    brand: 'Breeze', 
    price: '$149',
    description: 'Flowing bohemian maxi dress',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Beige', 'White', 'Terracotta'],
    images: {
      front: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
    }
  },
]

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(1)
  const [flippedCard, setFlippedCard] = useState(null)
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedColor, setSelectedColor] = useState({})
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  const itemsPerPage = 12
  const filteredDresses = categoryFilter === 'all' 
    ? DRESSES 
    : DRESSES.filter(d => d.category === categoryFilter)
  
  const totalPages = Math.ceil(filteredDresses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedItems = filteredDresses.slice(startIndex, startIndex + itemsPerPage)

  const handleCardClick = (itemId) => {
    setFlippedCard(flippedCard === itemId ? null : itemId)
  }

  const handleSizeSelect = (itemId, size) => {
    setSelectedSize({ ...selectedSize, [itemId]: size })
  }

  const handleColorSelect = (itemId, color) => {
    setSelectedColor({ ...selectedColor, [itemId]: color })
  }

  const calculatePrice = (basePrice, itemId) => {
    const size = selectedSize[itemId]
    if (!size) return basePrice
    
    const priceNum = parseInt(basePrice.replace('$', ''))
    const sizePricing = { 'XS': -10, 'S': 0, 'M': 0, 'L': 10, 'XL': 20 }
    const adjustment = sizePricing[size] || 0
    return '$' + (priceNum + adjustment)
  }

  return (
    <div className="catalog-page">
      {/* Header */}
      <header className="catalog-header">
        <Link href="/" className="back-home">← Home</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/images/logo.png" alt="LOOKBOOKgen Logo" style={{ width: '40px', height: '40px', filter: 'drop-shadow(0 2px 8px rgba(96, 239, 255, 0.4))' }} />
          <h1>Women's Clothing</h1>
        </div>
        <div className="view-toggle">
          <Link href="/lookbook" className="view-link">Carousel View</Link>
        </div>
      </header>

      {/* Filters */}
      <div className="catalog-filters">
        <button 
          className={categoryFilter === 'all' ? 'active' : ''} 
          onClick={() => setCategoryFilter('all')}
        >
          All
        </button>
        <button 
          className={categoryFilter === 'women' ? 'active' : ''} 
          onClick={() => setCategoryFilter('women')}
        >
          Women
        </button>
        <button 
          className={categoryFilter === 'men' ? 'active' : ''} 
          onClick={() => setCategoryFilter('men')}
        >
          Men
        </button>
      </div>

      {/* Grid Layout - 3 Column Flip Cards */}
      <div className="catalog-grid">
        {displayedItems.map((item, index) => {
          const globalIndex = startIndex + index + 1
          const isFlipped = flippedCard === item.id
          
          return (
            <div 
              key={item.id} 
              className={`flip-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(item.id)}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="card-header">Women's Clothing</div>
                  <div className="card-image">
                    <img src={item.images.front} alt={item.name} />
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-price">Price: {calculatePrice(item.price, item.id)}</p>
                    {item.description && (
                      <p className="card-description">{item.description}</p>
                    )}
                  </div>
                  <div className="card-number">{globalIndex}</div>
                </div>
                
                {/* Back Side - Customization Options */}
                <div className="flip-card-back" onClick={(e) => e.stopPropagation()}>
                  <div className="back-header">
                    <h3>{item.name}</h3>
                    <p className="back-price">{calculatePrice(item.price, item.id)}</p>
                  </div>
                  
                  {/* Size Selection */}
                  {item.availableSizes && (
                    <div className="option-section">
                      <label className="option-label">SELECT SIZE</label>
                      <div className="size-options">
                        {item.availableSizes.map(size => (
                          <button
                            key={size}
                            className={`size-btn ${selectedSize[item.id] === size ? 'active' : ''}`}
                            onClick={() => handleSizeSelect(item.id, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Color Selection */}
                  {item.availableColors && (
                    <div className="option-section">
                      <label className="option-label">AVAILABLE COLORS</label>
                      <div className="color-options">
                        {item.availableColors.map(color => (
                          <button
                            key={color}
                            className={`color-option ${selectedColor[item.id] === color ? 'active' : ''}`}
                            onClick={() => handleColorSelect(item.id, color)}
                          >
                            <span className="color-dot" style={{
                              backgroundColor: 
                                color === 'Black' ? '#000' :
                                color === 'Navy' ? '#001f3f' :
                                color === 'Burgundy' ? '#800020' :
                                color === 'Wine' ? '#722f37' :
                                color === 'Maroon' ? '#800000' :
                                color === 'Emerald' ? '#50C878' :
                                color === 'Forest Green' ? '#228B22' :
                                color === 'Teal' ? '#008080' :
                                color === 'White' ? '#fff' :
                                color === 'Beige' ? '#F5F5DC' :
                                '#ccc'
                            }}></span>
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button className="add-cart-btn">Add to Cart</button>
                  <button className="flip-back-btn" onClick={(e) => {
                    e.stopPropagation()
                    setFlippedCard(null)
                  }}>
                    ← Back to Product
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="page-btn"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          &lt;&lt; Page
        </button>
        <span className="page-number">{currentPage}</span>
        <button 
          className="page-btn"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>

      {/* Thumbnail Strip at Bottom */}
      <div className="thumbnail-strip">
        {displayedItems.map((item) => (
          <div 
            key={`thumb-${item.id}`} 
            className="thumbnail-item"
            onClick={() => handleCardClick(item.id)}
          >
            <img src={item.images.front} alt={item.name} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .catalog-page {
          min-height: 100vh;
          background: #1a1a1a;
          color: white;
          padding: 20px;
        }

        .catalog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          border-bottom: 3px solid #00bcd4;
          margin-bottom: 30px;
          background: linear-gradient(90deg, #00bcd4 0%, #0097a7 100%);
        }

        .back-home {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          transition: color 0.3s;
        }

        .back-home:hover {
          color: #000;
        }

        .catalog-header h1 {
          font-size: 28px;
          margin: 0;
          text-align: center;
          color: white;
        }

        .view-toggle {
          display: flex;
          gap: 10px;
        }

        .view-link {
          color: white;
          text-decoration: none;
          padding: 8px 16px;
          border: 2px solid white;
          border-radius: 4px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .view-link:hover {
          background: white;
          color: #00bcd4;
        }

        .catalog-filters {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .catalog-filters button {
          padding: 10px 24px;
          background: #2a2a2a;
          border: 1px solid #00bcd4;
          color: white;
          cursor: pointer;
          border-radius: 4px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .catalog-filters button.active,
        .catalog-filters button:hover {
          background: #00bcd4;
          border-color: #00bcd4;
          color: #000;
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 40px;
          padding: 0 20px;
        }

        .flip-card {
          background: transparent;
          perspective: 1000px;
          height: 600px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .flip-card-front {
          background: white;
          display: flex;
          flex-direction: column;
        }

        .flip-card-back {
          background: white;
          color: #000;
          transform: rotateY(180deg);
          padding: 30px;
          overflow-y: auto;
        }

        .card-header {
          background: #f5f5f5;
          padding: 12px;
          text-align: center;
          color: #000;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid #ddd;
        }

        .card-image {
          flex: 1;
          overflow: hidden;
          background: #f5f5f5;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-info {
          padding: 20px;
          color: #000;
          background: white;
        }

        .card-title {
          font-size: 16px;
          font-weight: bold;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          text-align: center;
        }

        .card-price {
          font-size: 18px;
          font-weight: 700;
          margin: 8px 0;
          text-align: center;
          color: #000;
        }

        .card-description {
          font-size: 12px;
          color: #666;
          margin: 8px 0 0 0;
          line-height: 1.4;
          text-align: center;
        }

        .card-number {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
        }

        /* Back Side Styles */}
        .back-header {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #00bcd4;
        }

        .back-header h3 {
          font-size: 20px;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          color: #000;
        }

        .back-price {
          font-size: 24px;
          font-weight: 800;
          color: #E85D4F;
          margin: 0;
        }

        .option-section {
          margin-bottom: 20px;
        }

        .option-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }

        .size-options {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .size-btn {
          padding: 10px 16px;
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          cursor: pointer;
          transition: all 0.3s;
        }

        .size-btn:hover {
          border-color: #00bcd4;
          background: #e0f7fa;
        }

        .size-btn.active {
          background: #00bcd4;
          border-color: #00bcd4;
          color: white;
        }

        .color-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .color-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }

        .color-option:hover {
          border-color: #00bcd4;
          background: #e0f7fa;
        }

        .color-option.active {
          background: white;
          border-color: #E85D4F;
          box-shadow: 0 2px 8px rgba(232, 93, 79, 0.2);
        }

        .color-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #ddd;
          flex-shrink: 0;
        }

        .add-cart-btn {
          width: 100%;
          padding: 16px;
          background: #000;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s;
          text-transform: uppercase;
        }

        .add-cart-btn:hover {
          background: #00bcd4;
          color: #000;
        }

        .flip-back-btn {
          width: 100%;
          padding: 12px;
          background: transparent;
          color: #00bcd4;
          border: 2px solid #00bcd4;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s;
        }

        .flip-back-btn:hover {
          background: #00bcd4;
          color: white;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin: 40px 0;
        }

        .page-btn {
          padding: 12px 24px;
          background: #00bcd4;
          color: #000;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s;
          font-size: 14px;
        }

        .page-btn:hover:not(:disabled) {
          background: #0097a7;
          transform: scale(1.05);
        }

        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .page-number {
          font-size: 24px;
          font-weight: bold;
          color: #00bcd4;
          background: #2a2a2a;
          padding: 10px 20px;
          border-radius: 8px;
          min-width: 60px;
          text-align: center;
        }

        .thumbnail-strip {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 20px 0;
          border-top: 2px solid #00bcd4;
          scrollbar-width: thin;
          scrollbar-color: #00bcd4 #2a2a2a;
        }

        .thumbnail-strip::-webkit-scrollbar {
          height: 8px;
        }

        .thumbnail-strip::-webkit-scrollbar-track {
          background: #2a2a2a;
        }

        .thumbnail-strip::-webkit-scrollbar-thumb {
          background: #00bcd4;
          border-radius: 4px;
        }

        .thumbnail-item {
          flex-shrink: 0;
          width: 80px;
          height: 100px;
          cursor: pointer;
          border: 3px solid transparent;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
          background: #f5f5f5;
        }

        .thumbnail-item:hover {
          border-color: #00bcd4;
          transform: scale(1.1);
        }

        .thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 1200px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .catalog-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .catalog-header {
            flex-direction: column;
            gap: 15px;
            padding: 15px 20px;
          }

          .flip-card {
            height: 550px;
          }

          .pagination {
            gap: 15px;
          }

          .page-btn {
            padding: 10px 18px;
            font-size: 13px;
          }

          .page-number {
            font-size: 20px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  )
}
