import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useState, useEffect } from 'react'

export default function DressViewer3D({ dress, onClose }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const dragSensitivity = 3 // pixels to drag before frame changes

  // Use 360° images if available, otherwise fall back to regular angle images
  const images360 = dress.images360 || []
  const regularImages = dress.images ? Object.values(dress.images) : []
  const availableImages = images360.length > 0 ? images360 : regularImages
  const totalFrames = availableImages.length
  const is360Mode = images360.length > 0

  // Preload all images for smooth rotation
  useEffect(() => {
    let loadedCount = 0
    availableImages.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loadedCount++
        if (loadedCount === totalFrames) {
          setImagesLoaded(true)
        }
      }
    })
  }, [])

  const handleMouseDown = (e) => {
    if (!is360Mode) return
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !is360Mode) return
    const deltaX = e.clientX - startX
    
    if (Math.abs(deltaX) > dragSensitivity) {
      const direction = deltaX > 0 ? -1 : 1
      setCurrentFrame((prev) => {
        const next = prev + direction
        if (next < 0) return totalFrames - 1
        if (next >= totalFrames) return 0
        return next
      })
      setStartX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (!is360Mode) return
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !is360Mode) return
    const deltaX = e.touches[0].clientX - startX
    
    if (Math.abs(deltaX) > dragSensitivity) {
      const direction = deltaX > 0 ? -1 : 1
      setCurrentFrame((prev) => {
        const next = prev + direction
        if (next < 0) return totalFrames - 1
        if (next >= totalFrames) return 0
        return next
      })
      setStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleThumbnailClick = (index) => {
    setCurrentFrame(index)
  }

  return (
    <div className="viewer-overlay">
      <div className="viewer-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="viewer-header">
          <h2>{dress.name}</h2>
          <p className="viewer-hint">
            {is360Mode ? (
              <>
                <span className="desktop-hint">🖱️ Drag left/right to rotate 360° • Scroll to zoom</span>
                <span className="mobile-hint">👆 Swipe to rotate 360° • Pinch to zoom</span>
              </>
            ) : (
              <>
                <span className="desktop-hint">📸 {totalFrames} poses available • Scroll to zoom</span>
                <span className="mobile-hint">📸 {totalFrames} poses • Pinch to zoom</span>
              </>
            )}
          </p>
        </div>

        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={3}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent>
                <div
                  className="dress-viewer"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    cursor: is360Mode ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  }}
                >
                  {!imagesLoaded && (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      <p>Loading 360° view...</p>
                    </div>
                  )}
                  <img
                    src={availableImages[currentFrame]}
                    alt={`${dress.name} - frame ${currentFrame + 1}`}
                    className="dress-image"
                    draggable="false"
                    style={{
                      opacity: imagesLoaded ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}
                  />
                  
                  {/* Frame indicator for 360° mode */}
                  {is360Mode && imagesLoaded && (
                    <div className="frame-indicator">
                      Frame {currentFrame + 1} / {totalFrames}
                      <div className="frame-progress">
                        <div 
                          className="frame-progress-bar" 
                          style={{ width: `${((currentFrame + 1) / totalFrames) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </TransformComponent>

              <div className="viewer-controls">
                <button onClick={() => zoomIn()} className="ctrl-btn" title="Zoom In">+</button>
                <button onClick={() => resetTransform()} className="ctrl-btn" title="Reset">⟲</button>
                <button onClick={() => zoomOut()} className="ctrl-btn" title="Zoom Out">−</button>
              </div>
            </>
          )}
        </TransformWrapper>

        {/* Thumbnail Navigation Strip */}
        {imagesLoaded && (
          <div className="thumbnail-strip">
            <div className="thumbnail-label-header">
              {is360Mode ? 'Rotation Angles' : 'Available Poses'}
            </div>
            <div className="thumbnails-container">
              {availableImages.map((src, index) => (
                <div
                  key={index}
                  className={`thumbnail ${currentFrame === index ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img src={src} alt={`Pose ${index + 1}`} draggable="false" />
                  <div className="thumbnail-label">
                    {is360Mode ? `${Math.round((index / totalFrames) * 360)}°` : `#${index + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dress-details">
          <div className="detail-row">
            <span className="label">Brand:</span>
            <span className="value">{dress.brand}</span>
          </div>
          <div className="detail-row">
            <span className="label">Color:</span>
            <span className="value">{dress.color}</span>
          </div>
          <div className="detail-row">
            <span className="label">Size:</span>
            <span className="value">{dress.size}</span>
          </div>
          <div className="detail-row">
            <span className="label">Price:</span>
            <span className="value price">{dress.price}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .viewer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .viewer-container {
          background: #1a1a1a;
          border-radius: 16px;
          max-width: 1000px;
          width: 100%;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          z-index: 10;
          transition: all 0.2s;
          backdrop-filter: blur(10px);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .viewer-header {
          padding: 24px 24px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .viewer-header h2 {
          margin: 0 0 8px;
          color: white;
          font-size: 24px;
        }

        .viewer-hint {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }

        .desktop-hint { display: inline; }
        .mobile-hint { display: none; }

        .dress-viewer {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0a0a;
          min-height: 400px;
        }

        .loading-spinner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: white;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .dress-image {
          max-width: 100%;
          max-height: 55vh;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
        }

        .frame-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          padding: 10px 16px;
          border-radius: 12px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .frame-progress {
          margin-top: 6px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .frame-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.1s;
        }

        .viewer-controls {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ctrl-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ctrl-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        /* Thumbnail Navigation Strip */
        .thumbnail-strip {
          background: rgba(0, 0, 0, 0.5);
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          max-height: 150px;
          overflow-y: auto;
        }

        .thumbnail-label-header {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .thumbnails-container {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 4px;
        }

        .thumbnails-container::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnails-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }

        .thumbnails-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .thumbnail {
          flex-shrink: 0;
          width: 80px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s;
          position: relative;
        }

        .thumbnail:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .thumbnail.active {
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
        }

        .thumbnail img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          display: block;
        }

        .thumbnail-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 10px;
          padding: 4px;
          text-align: center;
          font-weight: 600;
        }

        .dress-details {
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.05);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .value.price {
          color: #a78bfa;
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .desktop-hint { display: none; }
          .mobile-hint { display: inline; }
          
          .viewer-container {
            max-height: 98vh;
          }

          .viewer-header h2 {
            font-size: 20px;
          }

          .dress-image {
            max-height: 45vh;
          }

          .viewer-controls {
            right: 12px;
          }

          .ctrl-btn {
            width: 36px;
            height: 36px;
            font-size: 18px;
          }

          .thumbnail {
            width: 60px;
          }

          .thumbnail img {
            height: 60px;
          }

          .dress-details {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}
