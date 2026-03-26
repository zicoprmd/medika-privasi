import { Section } from './UI'

export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Booking via WhatsApp', desc: 'Hubungi kami via WhatsApp. Pilih layanan dan waktu yang diinginkan.' },
    { num: '02', title: 'Konsultasi / Kunjungan', desc: 'Datang ke lokasi atau gunakan layanan home visit. Dokter siap membantu.' },
    { num: '03', title: 'Dapat Laporan & Rekomendasi', desc: 'Dapatkan laporan kesehatan digital dan rekomendasi yang jelas.' },
  ]

  return (
    <Section id="cara-kerja" className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cara Kerja</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hanya tiga langkah mudah untuk mendapat perawatan kesehatan terbaik
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="relative text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-500/30">
              {step.num}
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#10B981]/50 to-transparent" />
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
