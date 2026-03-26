import { Section } from './UI'
import { Icons } from './Icons'

export function WhyUs() {
  const reasons = [
    { icon: <Icons.User />, title: 'Dokter Berpengalaman', desc: 'Dokter kami bersertifikat dan berpengalaman dengan pendekatan yang personal.' },
    { icon: <Icons.Chat />, title: 'Pendekatan Personal', desc: 'Konsultasi tanpa terburu-buru. Dokter benar-benar mendengarkan keluhan Anda.' },
    { icon: <Icons.Sparkles />, title: 'Teknologi Modern', desc: 'AI-assisted untuk laporan yang akurat dan mudah dipahami.' },
    { icon: <Icons.Shield />, title: 'Privasi Terjaga', desc: 'Data kesehatan Anda 100% rahasia. Tanpa sistem BPJS yang rumit.' },
  ]

  return (
    <Section id="tentang" className="bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Kenapa Harus Medika Privasi?</h2>
          <p className="text-gray-600 mb-8">
            Kami hadir untuk memberikan pengalaman kesehatan yang berbeda — praktis, privat, dan tetap berkualitas tinggi.
          </p>
          <div className="space-y-4">
            {reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#10B981] flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{r.title}</h4>
                  <p className="text-sm text-gray-600">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-[#10B981]/10 to-blue-400/10 rounded-3xl p-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-[#10B981]">
                  <Icons.Check />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Konsultasi Selesai</p>
                  <p className="text-sm text-gray-500">Hari ini, 14.30 WIB</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="text-[#10B981] font-medium">Selesai</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Durasi</span>
                  <span className="text-gray-900">35 menit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Jenis</span>
                  <span className="text-gray-900">Medical Check</span>
                </div>
              </div>
              <div className="pt-4">
                <div className="text-sm text-gray-500 mb-2">Laporan siap diunduh</div>
                <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-[#10B981]">
                    <Icons.Document />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Laporan_Konsultasi.pdf</p>
                    <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
