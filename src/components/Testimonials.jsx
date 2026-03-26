import { Section, Card } from './UI'
import { Icons } from './Icons'

export function Testimonials() {
  const reviews = [
    {
      name: 'Andika Pratama',
      role: 'Manajer IT, 32 tahun',
      text: 'Finalmente layanan kesehatan yang nggak bikin ribet. Booking via WA, langsung dapat jadwal. Dokternya sabar banget jelasin hasil pemeriksaan.',
      rating: 5,
    },
    {
      name: 'Sari Wulandari',
      role: 'Ibu Rumah Tangga, 29 tahun',
      text: 'Pakai layanan home visit buat anak saya. Dokternya ramah, anak saya nggak takut. Laporan kesehatannya juga sangat lengkap dan mudah dipahami.',
      rating: 5,
    },
    {
      name: 'Budi Santoso',
      role: 'Wiraswasta, 38 tahun',
      text: 'Sebagai pekerja sibuk, ini solusi terbaik. Nggak perlu antre, konsultasi bisa malam hari. Kualitas setara rumah sakit besar.',
      rating: 5,
    },
  ]

  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Apa Kata Mereka</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dengarkan pengalaman dari pasien kami yang sudah merasakan manfaat layanan Medika Privasi
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <Card key={i} className="flex flex-col">
            <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
              {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} />)}
            </div>
            <p className="text-gray-600 mb-6 flex-1 italic">"{r.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-medium">
                {r.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{r.name}</p>
                <p className="text-sm text-gray-500">{r.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
