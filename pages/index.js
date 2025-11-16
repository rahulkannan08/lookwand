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
      <div className="logo-container">
        <div className="logo-icon"></div>
        <h1 className="title">LOOKBOOKgen</h1>
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

      {/* Workflow Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="workflow-section"
      >
        <div className="workflow-steps">
          <div className="workflow-step">
            <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="35" r="25" fill="none" stroke="currentColor" strokeWidth="4"/>
              <rect x="20" y="55" width="60" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="4"/>
              <circle cx="50" cy="35" r="8" fill="currentColor"/>
              <rect x="70" y="62" width="8" height="8" rx="2" fill="currentColor"/>
            </svg>
            <div className="step-label">SHOOT</div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 L50 60 M35 45 L50 60 L65 45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="20" y="70" width="60" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="4"/>
            </svg>
            <div className="step-label">UPLOAD PHOTOS</div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 40 Q30 20 50 20 Q70 20 70 40 L70 70 Q70 85 55 85 L45 85 Q30 85 30 70 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M30 40 L70 40" stroke="currentColor" strokeWidth="4"/>
              <circle cx="40" cy="55" r="3" fill="currentColor"/>
              <circle cx="60" cy="55" r="3" fill="currentColor"/>
            </svg>
            <div className="step-label">CHOOSE POSE</div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="15" width="70" height="70" rx="5" fill="none" stroke="currentColor" strokeWidth="4"/>
              <circle cx="35" cy="35" r="8" fill="currentColor"/>
              <path d="M20 70 L40 50 L55 65 L75 40 L85 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="step-label">CHOOSE BACKGROUND</div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="8" fill="currentColor"/>
              <path d="M50 20 L50 30 M80 50 L70 50 M50 80 L50 70 M20 50 L30 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              <path d="M70 30 L63 37 M70 70 L63 63 M30 70 L37 63 M30 30 L37 37" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div className="step-label">GENERATE</div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <svg className="step-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 70 L50 20 L50 45 L75 45 L45 95 L45 70 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <div className="step-label">SOCIAL CAMPAIGN<br/>or E-COMMERCE</div>
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
                <circle cx="50" cy="35" r="15" fill="currentColor"/>
                <path d="M50 50 Q30 55 25 75 L75 75 Q70 55 50 50" fill="currentColor"/>
                <circle cx="35" cy="30" r="3" fill="#fff"/>
                <circle cx="65" cy="30" r="3" fill="#fff"/>
              </svg>
              <h3 className="message-title">Fashion Needs The Human Touch</h3>
              <p className="message-quote">
                "We don't replace models, stylists, or photographers. We empower them."
              </p>
              <p className="message-explanation">
                Real models are hired. Real clothes are made. Real creativity drives everything. 
                AI is just a tool for market research - helping brands make smarter decisions and reduce waste, not jobs.
              </p>
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
              <div className="use-case-icon">📦</div>
              <h3 className="use-case-title">Packshot Collections</h3>
              <p className="use-case-desc">Use already crafted clothes or collections to create stunning visuals</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -8 }}
              className="use-case-card"
            >
              <div className="use-case-icon">📱</div>
              <h3 className="use-case-title">Social Media Ready</h3>
              <p className="use-case-desc">Push content to socials & online shops with one click</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.03, y: -8 }}
              className="use-case-card"
            >
              <div className="use-case-icon">🔗</div>
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
                'https://drive.google.com/uc?id=1edKcLvVbJWuX93LeO3iPVf8kUVvZ3nQz',
                'https://drive.google.com/uc?id=1zlOHWEgcQoNJ03apVwRW4hs1lGraRg9g',
                'https://drive.google.com/uc?id=1e8iV-1v5pDPNNO7M1c1IQETmeAmPEcC5',
                'https://drive.google.com/uc?id=1iK__fG04Mns7cXau6eaagTnr8GcrmMBR',
                'https://drive.google.com/uc?id=1AKgn3kwr8HHhRGkYtbbyFf-QY6hV5FWq',
                'https://drive.google.com/uc?id=13UEYsL0bwY10oSRVmLWmmddBH9kIUuHx',
                'https://drive.google.com/uc?id=1ZytQxt6u5a1fkWBCx4U6xhbfcTtQKspQ',
                'https://drive.google.com/uc?id=1n0KxL0UJtgq963MRMpnggZxDt4JqcHhD'
              ].map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 + idx * 0.1 }}
                >
                  <img src={img} alt={`Example ${idx + 1}`} className="gallery-image" />
                  <div className="gallery-overlay">
                    <span className="overlay-text">AI Generated</span>
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
