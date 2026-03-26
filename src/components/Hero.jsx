import { Button } from './UI'
import { Icons } from './Icons'
import foto from "../img/pasfotosquare.jpg"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-emerald-50/30" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 rounded-full text-[#10B981] text-sm font-medium">
              <Icons.Sparkles /> Layanan Dokter Privat Premium
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Dokter Privat yang{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">Nyaman,</span>{' '}
              Cepat, dan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">Tanpa Ribet</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
              Layanan kesehatan modern dengan pendekatan personal dan berbasis teknologi. Tanpa antre, tanpa ribet, langsung dapat konsultasi berkualitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="text-lg px-8 py-4" onClick={() => window.open('https://wa.me/6285770207572?text=Halo dok, saya mau konsultasi. Bisa dibantu?', '_blank')}>
                <Icons.WhatsApp /> Booking Sekarang via WhatsApp
              </Button>
              <a href="#layanan">
                <Button variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto">
                  Lihat Layanan <Icons.Arrow />
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D'].map((initial) => (
                  <div
                    key={initial}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((i) => <Icons.Star key={i} />)}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">500+ pasien puas</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 to-blue-400/20 rounded-full animate-pulse" />
              <div className="absolute inset-8 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full" />
              <div className="absolute inset-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <img
                    src={foto}
                    alt="dr. Zico Permadi"
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl object-cover shadow-md border border-gray-200"
                  />
                  <p className="font-semibold text-gray-900">dr. Zico Permadi</p>
                  <p className="text-sm text-gray-500">“Dokter umum berpengalaman”</p>
                  <p className="text-sm text-gray-500">Fokus: kesehatan mental & edukasi IMS</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[#10B981] text-sm">
                    <Icons.Check /> Tersedia Sekarang
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
