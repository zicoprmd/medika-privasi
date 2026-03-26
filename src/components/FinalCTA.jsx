import { Button } from './UI'
import { Icons } from './Icons'

export function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#059669]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Mulai Konsultasi<br />Hari Ini
        </h2>
        <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
          Jangan tunda kesehatan Anda. Booking sekarang dan rasakan perbedaan layanan kesehatan yang benar-benar memperhatikan Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            className="bg-white text-[#10B981] hover:bg-emerald-50 text-lg px-10 py-4 shadow-xl"
            onClick={() => window.open('https://wa.me/6285770207572?text=Halo dok, saya mau konsultasi. Bisa dibantu?', '_blank')}
          >
            <Icons.WhatsApp /> Chat WhatsApp Sekarang
          </Button>
          <a href="#layanan">
            <Button variant="secondary" className="text-lg px-10 py-4">
              Lihat Semua Layanan
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
