import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ValueProp } from './components/ValueProp'
import { Services } from './components/Services'
import { HowItWorks } from './components/HowItWorks'
import { WhyUs } from './components/WhyUs'
import { Testimonials } from './components/Testimonials'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { Report } from './components/Report'

function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => { document.documentElement.style.scrollBehavior = 'auto' }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <ValueProp />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/laporan" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}
