import { useState, useEffect } from 'react'
import { Button } from './UI'
import { Icons } from './Icons'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">Medika Privasi</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#layanan" className="text-gray-600 hover:text-[#10B981] transition-colors text-sm font-medium">Layanan</a>
            <a href="#cara-kerja" className="text-gray-600 hover:text-[#10B981] transition-colors text-sm font-medium">Cara Kerja</a>
            <a href="#tentang" className="text-gray-600 hover:text-[#10B981] transition-colors text-sm font-medium">Tentang</a>
            <Button variant="primary" className="text-sm px-5 py-2.5" onClick={() => window.open('https://wa.me/6281234567890', '_blank')}>
              <Icons.WhatsApp /> Chat Sekarang
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
