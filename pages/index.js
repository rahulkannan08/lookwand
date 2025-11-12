import Link from 'next/link'

export default function Home() {
  return (
    <div className="landing">
      <div className="logo-container">
        <div className="logo-icon">✨</div>
        <h1 className="title">LookWand</h1>
        <p className="subtitle">AI-POWERED FASHION STUDIO</p>
      </div>
      {/* Use Link without an <a> child to match Next.js new behavior. */}
      <Link href="/lookbook" className="enter-btn" aria-label="Create LOOKBOOK">CREATE LOOKBOOK</Link>
      <p className="hint">Experience the future of fashion browsing with our interactive lookbook.</p>
    </div>
  )
}
