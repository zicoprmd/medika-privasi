import { Section, Card, Button } from './UI'
import { Icons } from './Icons'

export function Services() {
  const plans = [
    {
      name: 'Medical Check Ringan + Konsultasi',
      desc: 'Skrining kesehatan dasar dengan pendekatan holistik',
      features: [
        'Skrining kesehatan mental (PHQ-9, GAD-7, SDQ)',
        'Edukasi IMS',
        'Review gaya hidup',
        'Konsultasi 30 menit',
      ],
      price: 'Mulai dari Rp100.000',
      highlighted: false,
    },
    {
      name: 'Kesehatan Mental Praktis',
      desc: 'Solusi lengkap untuk kesejahteraan mental Anda',
      features: [
        'Screening komprehensif',
        'Interpretasi hasil detail',
        'Rekomendasi personal',
        'Follow up 2 minggu',
      ],
      price: 'Mulai dari Rp150.000',
      highlighted: true,
      badge: 'Paling Direkomendasikan',
    },
    {
      name: 'Dokter ke Rumah',
      desc: 'Konsultasi langsung di kenyamanan rumah Anda',
      features: [
        'Home visit oleh dokter',
        'Pemeriksaan fisik langsung',
        'Laporan digital (AI-assisted)',
        'Konsultasi 45 menit',
      ],
      price: 'Mulai dari Rp250.000',
      highlighted: false,
    },
  ]

  return (
    <Section id="layanan" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pilih paket yang sesuai dengan kebutuhan kesehatan Anda
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <Card key={i} highlighted={plan.highlighted} className="relative">
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F59E0B] text-white text-sm font-medium rounded-full">
                {plan.badge}
              </div>
            )}
            <div className={plan.highlighted ? '' : 'text-gray-900'}>
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-emerald-100' : 'text-gray-500'}`}>
                {plan.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-start gap-3 ${plan.highlighted ? 'text-white' : 'text-gray-600'}`}>
                    <span className={`mt-0.5 ${plan.highlighted ? 'text-white' : 'text-[#10B981]'}`}>
                      <Icons.Check />
                    </span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <div className={`text-2xl font-bold mb-4 ${plan.highlighted ? 'text-white' : 'text-[#10B981]'}`}>
                {plan.price}
              </div>
              <Button
                variant={plan.highlighted ? 'secondary' : 'outline'}
                className="w-full"
                onClick={() => window.open('https://wa.me/6285770207572?text=Halo dok, saya mau konsultasi. Bisa dibantu?', '_blank')}
              >
                Pilih Paket Ini
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
