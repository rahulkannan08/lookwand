import Link from 'next/link'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = -1000 // Start off-screen
    let mouseY = -1000
    let isMouseActive = false

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseActive = true
    }

    const handleMouseLeave = () => {
      isMouseActive = false
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    class AuroraLayer {
      constructor(index) {
        this.index = index
        this.baseSpeed = 0.00008 + index * 0.00003
        this.waveSpeed = 0.0003 + index * 0.0001
        this.amplitude = 80 + index * 40
        this.frequency = 0.003 + index * 0.001
        this.offset = index * Math.PI / 2.5
        this.verticalOffset = -200 + index * 60
        this.flowOffset = Math.random() * Math.PI * 2
        this.hue = 160 + index * 25
        this.pulseSpeed = 0.0003 + index * 0.00008
        this.frozenTime = 0 // Store the time when animation froze
        this.currentTime = 0 // Current animation time
      }

      draw(time, active, mx, my) {
        // Only update time if mouse is active
        if (active) {
          this.currentTime = time
        } else {
          // Freeze at current state
          if (this.frozenTime === 0) {
            this.frozenTime = this.currentTime
          }
        }

        const animTime = active ? this.currentTime : this.frozenTime
        
        ctx.beginPath()
        
        const flowX = Math.sin(animTime * this.baseSpeed + this.flowOffset) * 150
        const flowY = Math.cos(animTime * this.baseSpeed * 0.7) * 80
        const pulse = Math.sin(animTime * this.pulseSpeed) * 0.3 + 1
        
        for (let x = 0; x < canvas.width; x += 4) {
          // Calculate distance from mouse
          const dx = x - mx
          const dy = canvas.height / 2 + this.verticalOffset - my
          const distFromMouse = Math.sqrt(dx * dx + dy * dy)
          const activationRadius = 400 // Area of effect around mouse
          const activation = active ? Math.max(0, 1 - distFromMouse / activationRadius) : 0
          
          // Base waves (frozen when inactive)
          const wave1 = Math.sin(x * this.frequency + animTime * this.waveSpeed + this.offset) * this.amplitude
          const wave2 = Math.cos(x * this.frequency * 0.7 + animTime * this.waveSpeed * 1.3) * (this.amplitude * 0.6)
          const wave3 = Math.sin(x * this.frequency * 1.5 + animTime * this.waveSpeed * 0.8) * (this.amplitude * 0.4)
          
          // Flowing movement only near mouse
          const distanceFromFlow = Math.abs(x - canvas.width / 2 - flowX) / canvas.width
          const verticalFlow = (1 - distanceFromFlow) * flowY * 0.5 * activation
          
          // Mouse ripple effect
          const mouseRipple = activation * 50 * Math.sin(distFromMouse * 0.05 - time * 0.005)
          
          const y = canvas.height / 2 + 
            this.verticalOffset + 
            wave1 + wave2 + wave3 + 
            verticalFlow +
            mouseRipple
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        
        // Aurora gradient - fade when inactive
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        const baseAlpha = active ? 1 : 0.3 // Dimmer when idle
        const alpha1 = (0.08 + Math.sin(animTime * this.pulseSpeed) * 0.03) * pulse * baseAlpha
        const alpha2 = (0.12 + Math.sin(animTime * this.pulseSpeed + 1) * 0.04) * pulse * baseAlpha
        const alpha3 = (0.18 + Math.sin(animTime * this.pulseSpeed + 2) * 0.05) * pulse * baseAlpha
        
        gradient.addColorStop(0, `hsla(${this.hue}, 85%, 70%, ${alpha1})`)
        gradient.addColorStop(0.4, `hsla(${this.hue + 15}, 90%, 65%, ${alpha2})`)
        gradient.addColorStop(0.7, `hsla(${this.hue + 30}, 95%, 60%, ${alpha3})`)
        gradient.addColorStop(1, `hsla(${this.hue + 50}, 100%, 55%, 0.05)`)
        
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Glow effect - only visible when active
        if (active) {
          ctx.strokeStyle = `hsla(${this.hue + 20}, 100%, 75%, ${alpha2 * 0.6})`
          ctx.lineWidth = 2 + Math.sin(animTime * this.pulseSpeed) * 1
          ctx.stroke()
        }
        
        // Reset frozen time when becoming active
        if (active && this.frozenTime !== 0) {
          this.frozenTime = 0
        }
      }
    }

    const layers = Array.from({ length: 6 }, (_, i) => new AuroraLayer(i))

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw layers with active state
      layers.forEach(layer => layer.draw(time, isMouseActive, mouseX, mouseY))
      
      requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="landing">
      <canvas ref={canvasRef} className="aurora-canvas" />
      <div className="logo-container" style={{ animation: 'none' }}>
        <img src="/images/logo.png" alt="LOOKBOOKgen Logo" className="logo-icon" style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 4px 20px rgba(96, 239, 255, 0.5))' }} />
        <h1 className="title" style={{ animation: 'none' }}>LOOKBOOKgen</h1>
        <p className="subtitle">HUMANIZING GENERATIVE AI</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="typewriter-container"
      >
        <TypeAnimation
          sequence={[
            'Upload your photos',
            2000,
            'Create AI avatars',
            2000,
            'Generate fashion content',
            2000,
            'Plan E-commerce Social Campaigns',
            2000,
            'Faster workflow',
            2000,
          ]}
          wrapper="h2"
          speed={50}
          className="typewriter-text"
          repeat={Infinity}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="description-container"
      >
        <p className="description-text">
          Upload real model photos to generate HumAI avatars for your e-commerce and socials
        </p>
        <p className="description-subtext">
          Create endless fashion content for brands, influencers & creators
        </p>
      </motion.div>

      {/* Fashion Showcase - Before/After */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hero-showcase-section"
      >
        <div className="hero-showcase-grid">
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ 
              y: -15, 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.4 }
            }}
            className="hero-showcase-card"
          >
            <div className="hero-image-wrapper">
              <div className="hero-background-glow"></div>
              <img 
                src="/images/model-back.jpg" 
                alt="Real model fashion photography" 
                className="hero-showcase-image"
              />
              <div className="hero-corner hero-corner-tl"></div>
              <div className="hero-corner hero-corner-tr"></div>
              <div className="hero-corner hero-corner-bl"></div>
              <div className="hero-corner hero-corner-br"></div>
              <div className="hero-floating-badge hero-badge-1">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>REAL</span>
              </div>
            </div>
            <div className="hero-showcase-label">
              <div className="label-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="label-content">
                <h3 className="label-title">ORIGINAL PHOTO</h3>
                <p className="label-subtitle">Professional Model Shoot</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ 
              y: -15, 
              scale: 1.05,
              rotateY: -5,
              transition: { duration: 0.4 }
            }}
            className="hero-showcase-card hero-card-featured"
          >
            <div className="hero-image-wrapper">
              <div className="hero-background-glow hero-glow-ai"></div>
              <img 
                src="/images/model-front.jpg" 
                alt="AI-enhanced fashion avatar" 
                className="hero-showcase-image"
              />
              <div className="hero-corner hero-corner-tl"></div>
              <div className="hero-corner hero-corner-tr"></div>
              <div className="hero-corner hero-corner-bl"></div>
              <div className="hero-corner hero-corner-br"></div>
              <div className="hero-floating-badge hero-badge-2">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>AI</span>
              </div>
              <div className="ai-pulse-ring"></div>
            </div>
            <div className="hero-showcase-label">
              <div className="label-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M19 3L20 6L23 7L20 8L19 11L18 8L15 7L18 6L19 3Z" fill="currentColor" opacity="0.6"/>
                  <path d="M6 15L7 18L10 19L7 20L6 23L5 20L2 19L5 18L6 15Z" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <div className="label-content">
                <h3 className="label-title">AI AVATAR RESULT</h3>
                <p className="label-subtitle">Endless Possibilities</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connecting Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="hero-connector"
        >
          <svg viewBox="0 0 100 20" className="connector-arrow">
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(96, 239, 255, 0.3)" />
                <stop offset="50%" stopColor="rgba(96, 239, 255, 1)" />
                <stop offset="100%" stopColor="rgba(96, 239, 255, 0.3)" />
              </linearGradient>
            </defs>
            <path 
              d="M 0 10 L 85 10" 
              stroke="url(#arrowGradient)" 
              strokeWidth="3" 
              strokeDasharray="5,5"
              className="arrow-line"
            />
            <path 
              d="M 85 5 L 95 10 L 85 15" 
              fill="none" 
              stroke="#3be3ff" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
        </motion.div>
      </motion.div>

      {/* Workflow Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="workflow-section"
      >
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-circle">
              <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="35" r="25" fill="none" stroke="currentColor" strokeWidth="4"/>
                <rect x="20" y="55" width="60" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="4"/>
                <circle cx="50" cy="35" r="8" fill="currentColor"/>
                <rect x="70" y="62" width="8" height="8" rx="2" fill="currentColor"/>
              </svg>
            </div>
            <div className="step-label">SHOOT</div>
            <div className="connection-line"></div>
          </div>
          <div className="workflow-step">
            <div className="step-circle">
              <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 15 L50 60 M35 45 L50 60 L65 45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="20" y="70" width="60" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="4"/>
              </svg>
            </div>
            <div className="step-label">UPLOAD PHOTOS</div>
            <div className="connection-line"></div>
          </div>
          <div className="workflow-step">
            <div className="step-circle">
              <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 40 Q30 20 50 20 Q70 20 70 40 L70 70 Q70 85 55 85 L45 85 Q30 85 30 70 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
                <path d="M30 40 L70 40" stroke="currentColor" strokeWidth="4"/>
                <circle cx="40" cy="55" r="3" fill="currentColor"/>
                <circle cx="60" cy="55" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div className="step-label">PICK A POSE</div>
            <div className="connection-line"></div>
          </div>
          <div className="workflow-step">
            <div className="step-circle">
              <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="15" width="70" height="70" rx="5" fill="none" stroke="currentColor" strokeWidth="4"/>
                <circle cx="35" cy="35" r="8" fill="currentColor"/>
                <path d="M20 70 L40 50 L55 65 L75 40 L85 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="step-label">CHOOSE BACKGROUND</div>
            <div className="connection-line"></div>
          </div>
          <div className="workflow-step">
            <div className="step-circle">
              <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="8" fill="currentColor"/>
                <path d="M50 20 L50 30 M80 50 L70 50 M50 80 L50 70 M20 50 L30 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M70 30 L63 37 M70 70 L63 63 M30 70 L37 63 M30 30 L37 37" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="step-label">GENERATE CONTENT</div>
            <div className="connection-line"></div>
          </div>
          <div className="workflow-step">
            <div className="step-circle">
              <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 70 L50 20 L50 45 L75 45 L45 95 L45 70 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="step-label">UPLOAD TO SOCIALS AND RETAIL PLATFORM</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Link href="/lookbook" className="enter-btn" aria-label="Create AI Lookbook">
          CREATE AI LOOKBOOK
        </Link>
      </motion.div>

      {/* Fashion Carousel - Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="fashion-carousel-section"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="carousel-section-title"
        >
          Explore Fashion Styles
        </motion.h3>
        <div className="carousel-container">
          <div className="carousel-track">
            {[
              { src: '/images/portrait-beautiful-stylish-young-woman.jpg', label: 'Street Style', desc: 'Urban & Casual' },
              { src: '/images/full-shot-woman-wearing-full-pink-outfit.jpg', label: 'Bold Colors', desc: 'Vibrant & Confident' },
              { src: '/images/mannn.png', label: 'Classic Elegance', desc: 'Timeless & Refined' },
              { src: '/images/gorgeous-woman-with-blonde-wavy-hair-wearing-elegant-beige-dress (1).jpg', label: 'Evening Glam', desc: 'Luxury & Sophistication' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.15,
                  ease: [0.4, 0, 0.2, 1]
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="carousel-slide"
              >
                <div className="carousel-image-wrapper">
                  <img src={item.src} alt={item.label} className="carousel-image" />
                  <div className="carousel-gradient"></div>
                  <div className="carousel-shine"></div>
                </div>
                <div className="carousel-overlay">
                  <div className="carousel-content">
                    <span className="carousel-label">{item.label}</span>
                    <span className="carousel-description">{item.desc}</span>
                  </div>
                  <div className="carousel-view-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 16 16 12 12 8"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Vision Section - Why LOOKBOOKgen */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="vision-section"
      >
        <div className="vision-container">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="vision-title"
          >
            Why LOOKBOOKgen?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mission-statement"
          >
            <p className="mission-text">
              REDUCING CLOTHING WASTE, NOT JOBS
            </p>
            <p className="mission-subtext">
              Market research before mass production. Test designs with real models, get feedback, produce only what sells.
            </p>
          </motion.div>

          {/* Overproduction Waste Image Section */}
          <div className="overproduction-image-wrapper">
            <div className="overproduction-image-container">
              <motion.img
                src="/images/overproduction-waste.png"
                alt="Overproduction waste in fashion industry"
                className="overproduction-image"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
              <div className="corner-effect corner-tl"></div>
              <div className="corner-effect corner-tr"></div>
              <div className="corner-effect corner-bl"></div>
              <div className="corner-effect corner-br"></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="problem-showcase"
          >
            <div className="showcase-grid">
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="showcase-item problem-item"
              >
                <svg className="showcase-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="30" width="15" height="30" rx="2" fill="currentColor"/>
                  <rect x="42" y="30" width="15" height="30" rx="2" fill="currentColor"/>
                  <rect x="64" y="30" width="15" height="30" rx="2" fill="currentColor"/>
                  <path d="M15 65 L85 65 L80 85 L20 85 Z" fill="currentColor" opacity="0.6"/>
                  <line x1="30" y1="75" x2="70" y2="75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <h3 className="showcase-label">Overproduction Waste</h3>
                <p className="showcase-desc">Brands produce hundreds of pieces without knowing if they'll sell - leading to waste</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="showcase-item problem-item"
              >
                <svg className="showcase-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <path d="M50 25 L50 50 L65 65" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <text x="50" y="95" fontSize="16" fill="currentColor" textAnchor="middle">?</text>
                </svg>
                <h3 className="showcase-label">No Market Validation</h3>
                <p className="showcase-desc">Small brands risk everything producing designs that haven't been tested</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="showcase-item problem-item"
              >
                <svg className="showcase-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 40 Q30 20 50 20 Q70 20 70 40 L70 70 Q70 85 55 85 L45 85 Q30 85 30 70 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <line x1="30" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="4"/>
                  <line x1="20" y1="70" x2="80" y2="30" stroke="#ff4444" strokeWidth="5" strokeLinecap="round"/>
                </svg>
                <h3 className="showcase-label">Financial Risk</h3>
                <p className="showcase-desc">Crafting 200+ pieces upfront can make or break a small fashion brand</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="solution-arrow"
            >
              <div className="arrow-down">↓</div>
              <p className="solution-text">Our Solution: Test Before You Produce</p>
            </motion.div>

            <div className="showcase-grid">
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="showcase-item solution-item"
              >
                <svg className="showcase-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="25" y="25" width="50" height="60" rx="3" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <circle cx="50" cy="45" r="8" fill="currentColor"/>
                  <rect x="38" y="60" width="24" height="4" rx="2" fill="currentColor"/>
                  <rect x="33" y="68" width="34" height="4" rx="2" fill="currentColor"/>
                  <path d="M50 30 L50 20 M50 20 L45 25 M50 20 L55 25" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="showcase-label">Craft One Sample</h3>
                <p className="showcase-desc">Create just 1 physical piece per design - test it with AI-generated lookbooks</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="showcase-item solution-item"
              >
                <svg className="showcase-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="30" width="60" height="45" rx="3" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <path d="M30 50 L40 60 L55 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="68" cy="52" r="6" fill="currentColor"/>
                  <path d="M45 20 L50 10 L55 20" fill="currentColor"/>
                  <path d="M30 85 Q35 90 50 88 Q65 90 70 85" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <h3 className="showcase-label">Get Real Feedback</h3>
                <p className="showcase-desc">Share AI lookbooks, collect data, understand what your market actually wants</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="showcase-item solution-item"
              >
                <svg className="showcase-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <text x="30" y="55" fontSize="40" fontWeight="bold" fill="currentColor">50</text>
                  <path d="M20 65 L35 80 L50 75 L65 82 L80 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="35" cy="80" r="3" fill="#4ade80"/>
                  <circle cx="50" cy="75" r="3" fill="#4ade80"/>
                  <circle cx="65" cy="82" r="3" fill="#4ade80"/>
                </svg>
                <h3 className="showcase-label">Produce Smartly</h3>
                <p className="showcase-desc">Based on feedback, produce exactly 50, 100, or 500 pieces - not guessing</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="main-message"
          >
            <div className="message-box">
              <svg className="message-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <ellipse cx="50" cy="28" rx="12" ry="14" fill="currentColor"/>
                
                {/* Neck */}
                <rect x="46" y="40" width="8" height="6" fill="currentColor"/>
                
                {/* Shoulders and torso */}
                <path d="M50 46 C35 48 28 52 26 62 L26 78 L38 78 L38 58 C38 55 42 52 50 52 C58 52 62 55 62 58 L62 78 L74 78 L74 62 C72 52 65 48 50 46 Z" fill="currentColor"/>
                
                {/* Arms */}
                <path d="M26 52 L20 68 L24 70 L32 56 Z" fill="currentColor"/>
                <path d="M74 52 L80 68 L76 70 L68 56 Z" fill="currentColor"/>
                
                {/* Facial features - eyes */}
                <circle cx="44" cy="26" r="2" fill="#fff"/>
                <circle cx="56" cy="26" r="2" fill="#fff"/>
                
                {/* Smile */}
                <path d="M44 32 Q50 35 56 32" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
              <h3 className="message-title">Fashion Needs The Human Touch</h3>
              <p className="message-quote">
                We don't replace models, stylists, or photographers. We empower them.
              </p>
              <p className="message-explanation">
                Real models are hired. Real clothes are made. Real creativity drives everything. 
                AI is just a tool for market research - helping brands make smarter decisions and reduce waste, not jobs.
              </p>
            </div>
          </motion.div>

          {/* Behind The Scenes Images */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="behind-scenes-section"
          >
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="behind-scenes-title"
            >
              Real People, Real Process
            </motion.h3>
            
            <div className="behind-scenes-grid">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="behind-scene-card"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="scene-image-wrapper">
                  <img 
                    src="/images/image.png" 
                    alt="Fashion designers collaborating on designs" 
                    className="scene-image"
                  />
                  <div className="scene-gradient"></div>
                  <div className="scene-icon">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 40 L40 30 L50 40 L60 30 L70 40" fill="none" stroke="#3be3ff" strokeWidth="3" strokeLinecap="round"/>
                      <rect x="25" y="45" width="50" height="35" rx="3" fill="none" stroke="#3be3ff" strokeWidth="3"/>
                      <circle cx="40" cy="60" r="5" fill="#3be3ff" opacity="0.6"/>
                      <circle cx="60" cy="60" r="5" fill="#3be3ff" opacity="0.6"/>
                    </svg>
                  </div>
                </div>
                <div className="scene-content">
                  <h4 className="scene-label">Design & Collaboration</h4>
                  <p className="scene-description">
                    Fashion designers and stylists working together to create unique pieces and test concepts
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="behind-scene-card"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="scene-image-wrapper">
                  <img 
                    src="/images/image2.png" 
                    alt="Professional photoshoot with real models" 
                    className="scene-image"
                  />
                  <div className="scene-gradient"></div>
                  <div className="scene-icon">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="45" r="20" fill="none" stroke="#3be3ff" strokeWidth="3"/>
                      <circle cx="50" cy="45" r="12" fill="none" stroke="#3be3ff" strokeWidth="2"/>
                      <path d="M30 45 L25 45 M70 45 L75 45" stroke="#3be3ff" strokeWidth="3" strokeLinecap="round"/>
                      <rect x="35" y="20" width="30" height="5" rx="2" fill="#3be3ff" opacity="0.6"/>
                      <path d="M40 70 L45 85 L55 85 L60 70 Z" fill="none" stroke="#3be3ff" strokeWidth="3"/>
                    </svg>
                  </div>
                </div>
                <div className="scene-content">
                  <h4 className="scene-label">Professional Photoshoots</h4>
                  <p className="scene-description">
                    Real models in professional studio settings - the foundation for AI-enhanced content
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Showcase Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="features-showcase-section"
      >
        <div className="features-showcase-container">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="features-showcase-title"
          >
            ALL-IN-ONE TOOL FOR CREATIVES & BRANDS
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="features-showcase-subtitle"
          >
            Creating AI Fashion Content Based on Living People
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="use-cases-grid"
          >
            <motion.div 
              whileHover={{ scale: 1.03, y: -8 }}
              className="use-case-card"
            >
              <svg className="use-case-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="60" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="3"/>
                <rect x="20" y="30" width="60" height="15" fill="currentColor" opacity="0.3"/>
                <path d="M30 20 L50 10 L70 20 L70 30 L30 30 Z" fill="currentColor" opacity="0.5"/>
                <circle cx="35" cy="55" r="3" fill="currentColor"/>
                <circle cx="50" cy="55" r="3" fill="currentColor"/>
                <circle cx="65" cy="55" r="3" fill="currentColor"/>
                <rect x="30" y="65" width="15" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                <rect x="50" y="65" width="20" height="8" rx="1" fill="currentColor" opacity="0.6"/>
              </svg>
              <h3 className="use-case-title">Packshot Collections</h3>
              <p className="use-case-desc">Use already crafted clothes or collections to create stunning visuals</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -8 }}
              className="use-case-card"
            >
              <svg className="use-case-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="15" width="50" height="70" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                <rect x="25" y="15" width="50" height="10" rx="8" fill="currentColor" opacity="0.3"/>
                <circle cx="50" cy="78" r="4" fill="currentColor"/>
                <rect x="35" y="30" width="30" height="20" rx="3" fill="currentColor" opacity="0.4"/>
                <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="35" y1="62" x2="60" y2="62" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M60 38 L65 43 L75 30" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="use-case-title">Social Media Ready</h3>
              <p className="use-case-desc">Push content to socials & online shops with one click</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -8 }}
              className="use-case-card"
            >
              <svg className="use-case-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="70" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="3"/>
                <line x1="45" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <path d="M30 50 L25 45 M30 50 L25 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <path d="M70 50 L75 45 M70 50 L75 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="30" cy="50" r="6" fill="currentColor"/>
                <circle cx="70" cy="50" r="6" fill="currentColor"/>
              </svg>
              <h3 className="use-case-title">B2B Integration</h3>
              <p className="use-case-desc">Seamlessly integrate with your existing e-commerce platform</p>
            </motion.div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="example-gallery"
          >
            <h3 className="gallery-title">See It In Action</h3>
            <div className="gallery-grid">
              {[
                { src: '/images/fashion-woman-casual-summer-clothes (1).jpg', label: 'Summer Casual' },
                { src: '/images/mannobg.png', label: 'Studio Portrait' },
                { src: '/images/alluring-skinny-young-blonde-woman-posing-studio-red-background-she-is-wearing-blue-down-jacket-sunglasses-yellow-stockings (2).jpg', label: 'Bold & Bright' },
                { src: '/images/african-humoured-young-man-pointing-finger-with-cheerful-smile-indoor-photo-carefree-curly-african-guy-expressing-good-emotions.jpg', label: 'Street Style' },
                { src: '/images/from gargi 3.jpg', label: 'Editorial Fashion' },
                { src: '/images/imagegrl.png', label: 'Modern Look' },
                { src: '/images/close-up-portrait-man-shirt-mockup (1).jpg', label: 'Classic Style' },
                { src: '/images/final.png', label: 'Final Touch' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ 
                    scale: 1.12, 
                    zIndex: 10,
                    rotate: idx % 2 === 0 ? 2 : -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="gallery-item"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.7,
                    y: 60,
                    rotate: idx % 2 === 0 ? -10 : 10
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0,
                    rotate: 0
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: idx * 0.15,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <div className="gallery-image-container">
                    <img src={item.src} alt={item.label} className="gallery-image" />
                    <div className="gallery-shine"></div>
                  </div>
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <span className="overlay-badge">AI Generated</span>
                      <span className="overlay-label">{item.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6 }}
            className="key-benefits"
          >
            <div className="benefit-row">
              <div className="benefit-item">
                <div className="benefit-number">01</div>
                <h4 className="benefit-title">Real People</h4>
                <p className="benefit-text">Based on living models, not generic AI avatars</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">02</div>
                <h4 className="benefit-title">One-Click Export</h4>
                <p className="benefit-text">Instantly publish to socials and e-commerce sites</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">03</div>
                <h4 className="benefit-title">B2B Ready</h4>
                <p className="benefit-text">Enterprise integration for your workflow</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-number">04</div>
                <h4 className="benefit-title">Endless Content</h4>
                <p className="benefit-text">Unlimited variations for every campaign</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="feature-tags"
      >
        <span className="feature-tag">Real People</span>
        <span className="feature-tag">HumAI</span>
        <span className="feature-tag">Infinite Content</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="footer-tagline"
      >
        <p>Customizable lookbook creator</p>
      </motion.div>
    </div>
  )
}
