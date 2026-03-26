import { Section, Card } from './UI'
import { Icons } from './Icons'

export function ValueProp() {
  const props = [
    { icon: <Icons.Clock />, title: 'Tanpa Antre Panjang', desc: 'Booking dulu, datang sesuai waktu. Tidak perlu menunggu berjam-jam di klinik.' },
    { icon: <Icons.Shield />, title: 'Privat & Rahasia', desc: 'Konsultasi langsung pribadi. Data kesehatan Anda 100% terjaga privat.' },
    { icon: <Icons.Chat />, title: 'Edukasi Jelas', desc: 'Dokter menjelaskan dengan detail. Anda paham kondisi kesehatan Anda sepenuhnya.' },
    { icon: <Icons.Document />, title: 'Laporan Modern', desc: 'Dapatkan laporan kesehatan digital yang rapi dan mudah dipahami.' },
  ]

  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Kenapa Pilih Kami?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami memahami kebutuhan Anda akan layanan kesehatan yang efisien, privat, dan berkualitas
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {props.map((p, i) => (
          <Card key={i} className="text-center group hover:border-[#10B981]/30">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#10B981] group-hover:bg-[#10B981] group-hover:text-white transition-colors">
              {p.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
