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
        this.baseSpeed = 0.0003 + index * 0.0001
        this.waveSpeed = 0.001 + index * 0.0003
        this.amplitude = 80 + index * 40
        this.frequency = 0.003 + index * 0.001
        this.offset = index * Math.PI / 2.5
        this.verticalOffset = -200 + index * 60
        this.flowOffset = Math.random() * Math.PI * 2
        this.hue = 160 + index * 25
        this.pulseSpeed = 0.0008 + index * 0.0002
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
      <motion.div 
        className="logo-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="logo-icon"
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        ></motion.div>
        <h1 className="title">LookWand</h1>
        <p className="subtitle">HUMANIZING GENERATIVE AI</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="typewriter-container"
      >
        <TypeAnimation
          sequence={[
            'Upload Your Photos',
            2000,
            'Create AI Avatars',
            2000,
            'Generate Fashion Content',
            2000,
            'Transform Your Brand',
            2000,
            'Humanize Generative AI',
            2000,
          ]}
          wrapper="h2"
          speed={50}
          className="typewriter-text"
          repeat={Infinity}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link href="/lookbook" className="enter-btn" aria-label="Create AI Lookbook">
          CREATE AI LOOKBOOK
        </Link>
      </motion.div>
      
      <motion.p 
        className="hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Upload model photos  Generate AI avatars  Create endless fashion content for brands, influencers & creators
      </motion.p>

      <motion.div
        className="features-preview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div 
          className="feature-tag"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ duration: 0.2 }}
        >
           Real People
        </motion.div>
        <motion.div 
          className="feature-tag"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ duration: 0.2 }}
        >
           AI Avatars
        </motion.div>
        <motion.div 
          className="feature-tag"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ duration: 0.2 }}
        >
           Infinite Content
        </motion.div>
      </motion.div>
    </div>
  )
}
