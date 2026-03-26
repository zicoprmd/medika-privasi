import { useState } from 'react'
import { Button } from './UI'
import { Icons } from './Icons'

const templates = [
  { id: 'umum', name: 'Laporan Umum', desc: 'Medical check-up standar' },
  { id: 'mental', name: 'Kesehatan Mental', desc: 'Skrining PHQ-9 & GAD-7', badge: 'Value Tinggi' },
  { id: 'ims', name: 'Edukasi IMS', desc: 'Infeksi Menular Seksual', badge: 'Sensitif & Premium' },
]

export function Report() {
  const [selectedTemplate, setSelectedTemplate] = useState('umum')
  const [formData, setFormData] = useState({
    nama: '',
    umur: '',
    jenisKelamin: '',
    tanggal: new Date().toLocaleDateString('id-ID'),
    keluhan: '',
    tekananDarah: '',
    detakJantung: '',
    suhuTubuh: '',
    beratBadan: '',
    tinggiBadan: '',
    imt: '',
    anamnesis: '',
    pemeriksaan: '',
    diagnosis: '',
    terapi: '',
    edukasi: '',
    selanjutnya: '',
    // Mental Health specific
    phq1: '', phq2: '', phq3: '', phq4: '', phq5: '', phq6: '', phq7: '', phq8: '', phq9: '',
    gad1: '', gad2: '', gad3: '', gad4: '', gad5: '', gad6: '', gad7: '',
    mentalKesimpulan: '',
    // IMS specific
    imsRiwayat: '',
    imsKelamin: '',
    imsGejala: '',
    imsPemeriksaan: '',
    imsDiagnosis: '',
    imsTerapi: '',
    imsEdukasi: '',
  })

  const [generatedReport, setGeneratedReport] = useState(null)
  const [showReport, setShowReport] = useState(false)

  const calculateIMT = () => {
    const bb = parseFloat(formData.beratBadan)
    const tb = parseFloat(formData.tinggiBadan) / 100
    if (bb && tb) {
      const imt = (bb / (tb * tb)).toFixed(1)
      setFormData(prev => ({ ...prev, imt }))
      return imt
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculatePHQ = () => {
    const scores = [formData.phq1, formData.phq2, formData.phq3, formData.phq4, formData.phq5,
                    formData.phq6, formData.phq7, formData.phq8, formData.phq9]
    const valid = scores.filter(s => s !== '')
    if (valid.length === 9) {
      const total = valid.reduce((a, b) => a + parseInt(b), 0)
      let interpretasi = ''
      if (total <= 4) interpretasi = 'Minimal depresi'
      else if (total <= 9) interpretasi = 'Depresi ringan'
      else if (total <= 14) interpretasi = 'Depresi sedang'
      else if (total <= 19) interpretasi = 'Depresi berat'
      else interpretasi = 'Depresi sangat berat'
      return { total, interpretasi }
    }
    return null
  }

  const calculateGAD = () => {
    const scores = [formData.gad1, formData.gad2, formData.gad3, formData.gad4, formData.gad5,
                    formData.gad6, formData.gad7]
    const valid = scores.filter(s => s !== '')
    if (valid.length === 7) {
      const total = valid.reduce((a, b) => a + parseInt(b), 0)
      let interpretasi = ''
      if (total <= 4) interpretasi = 'Kecemasan minimal'
      else if (total <= 9) interpretasi = 'Kecemasan ringan'
      else if (total <= 14) interpretasi = 'Kecemasan sedang'
      else if (total <= 19) interpretasi = 'Kecemasan berat'
      else interpretasi = 'Kecemasan sangat berat'
      return { total, interpretasi }
    }
    return null
  }

  const generateReport = () => {
    const bb = parseFloat(formData.beratBadan)
    const tb = parseFloat(formData.tinggiBadan) / 100
    const imt = bb && tb ? (bb / (tb * tb)).toFixed(1) : '-'

    let kategoriIMT = ''
    if (imt !== '-') {
      if (imt < 18.5) kategoriIMT = 'Berat badan kurang'
      else if (imt < 25) kategoriIMT = 'Berat badan normal'
      else if (imt < 30) kategoriIMT = 'Berat badan berlebih'
      else kategoriIMT = 'Obesitas'
    }

    const phqResult = calculatePHQ()
    const gadResult = calculateGAD()

    const report = {
      id: `LP-${Date.now().toString().slice(-6)}`,
      template: selectedTemplate,
      tanggal: new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      ...formData,
      imt: imt !== '-' ? `${imt} (${kategoriIMT})` : '-',
      dokter: 'dr. Zico Permadi',
      phqResult,
      gadResult,
    }
    setGeneratedReport(report)
    setShowReport(true)
  }

  const resetForm = () => {
    setFormData({
      nama: '', umur: '', jenisKelamin: '',
      tanggal: new Date().toLocaleDateString('id-ID'),
      keluhan: '', tekananDarah: '', detakJantung: '', suhuTubuh: '',
      beratBadan: '', tinggiBadan: '', imt: '',
      anamnesis: '', pemeriksaan: '', diagnosis: '', terapi: '', edukasi: '', selanjutnya: '',
      phq1: '', phq2: '', phq3: '', phq4: '', phq5: '', phq6: '', phq7: '', phq8: '', phq9: '',
      gad1: '', gad2: '', gad3: '', gad4: '', gad5: '', gad6: '', gad7: '',
      mentalKesimpulan: '',
      imsRiwayat: '', imsKelamin: '', imsGejala: '', imsPemeriksaan: '',
      imsDiagnosis: '', imsTerapi: '', imsEdukasi: '',
    })
    setGeneratedReport(null)
    setShowReport(false)
  }

  const changeTemplate = (templateId) => {
    setSelectedTemplate(templateId)
    resetForm()
    setSelectedTemplate(templateId)
  }

  const printReport = () => {
    window.print()
  }

  const scaleOptions = [
    { value: '', label: 'Tidak pernah' },
    { value: '0', label: '0 - Tidak pernah' },
    { value: '1', label: '1 - Beberapa hari' },
    { value: '2', label: '2 - Lebih dari setengah hari' },
    { value: '3', label: '3 - Hampir setiap hari' },
  ]

  // ==================== REPORT VIEW ====================
  if (showReport && generatedReport) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">MEDIKA PRIVASI</h1>
                <p className="text-emerald-100 text-sm mt-1">
                  {generatedReport.template === 'umum' && 'Laporan Medical Check-Up'}
                  {generatedReport.template === 'mental' && 'Laporan Skrining Kesehatan Mental'}
                  {generatedReport.template === 'ims' && 'Laporan Edukasi IMS'}
                </p>
              </div>
              <div className="text-right text-sm">
                <p>No. Laporan: {generatedReport.id}</p>
                <p>{generatedReport.tanggal}</p>
                <p>{generatedReport.waktu}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Info Pasien */}
            <div>
              <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">DATA PASIEN</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Nama Lengkap</p>
                  <p className="font-semibold text-gray-900">{generatedReport.nama || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Umur</p>
                  <p className="font-semibold text-gray-900">{generatedReport.umur || '-'} tahun</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Jenis Kelamin</p>
                  <p className="font-semibold text-gray-900">{generatedReport.jenisKelamin || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Tanggal Kunjungan</p>
                  <p className="font-semibold text-gray-900">{generatedReport.tanggal}</p>
                </div>
              </div>
            </div>

            {/* Template Umum */}
            {generatedReport.template === 'umum' && (
              <>
                {generatedReport.keluhan && (
                  <div>
                    <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">KELUHAN UTAMA</h2>
                    <p className="text-gray-700">{generatedReport.keluhan}</p>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">TANDA-TANDA VITAL</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Tekanan Darah</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.tekananDarah || '-'}</p>
                      <p className="text-xs text-gray-500">mmHg</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Detak Jantung</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.detakJantung || '-'}</p>
                      <p className="text-xs text-gray-500">bpm</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Suhu Tubuh</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.suhuTubuh || '-'}</p>
                      <p className="text-xs text-gray-500">°C</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Berat Badan</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.beratBadan || '-'}</p>
                      <p className="text-xs text-gray-500">kg</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Tinggi Badan</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.tinggiBadan || '-'}</p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                  </div>
                  {generatedReport.imt && generatedReport.imt !== '-' && (
                    <div className="mt-4 bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Indeks Massa Tubuh (IMT)</p>
                        <p className="text-2xl font-bold text-blue-600">{generatedReport.imt}</p>
                      </div>
                      <Icons.Check />
                    </div>
                  )}
                </div>

                {generatedReport.anamnesis && <SectionRow title="ANAMNESIS" content={generatedReport.anamnesis} />}
                {generatedReport.pemeriksaan && <SectionRow title="PEMERIKSAAN FISIK" content={generatedReport.pemeriksaan} />}
                {generatedReport.diagnosis && <SectionRow title="DIAGNOSIS / KESIMPULAN" content={generatedReport.diagnosis} />}
                {generatedReport.terapi && <SectionRow title="TERAPI / REKOMENDASI" content={generatedReport.terapi} />}
                {generatedReport.edukasi && <SectionRow title="EDUKASI PASIEN" content={generatedReport.edukasi} />}
                {generatedReport.selanjutnya && <SectionRow title="RENCANA TINDAK LANJUT" content={generatedReport.selanjutnya} />}
              </>
            )}

            {/* Template Mental Health */}
            {generatedReport.template === 'mental' && (
              <>
                {generatedReport.keluhan && (
                  <div>
                    <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">KELUHAN UTAMA</h2>
                    <p className="text-gray-700">{generatedReport.keluhan}</p>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">TANDA-TANDA VITAL</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Tekanan Darah</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.tekananDarah || '-'}</p>
                      <p className="text-xs text-gray-500">mmHg</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Detak Jantung</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.detakJantung || '-'}</p>
                      <p className="text-xs text-gray-500">bpm</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Suhu Tubuh</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.suhuTubuh || '-'}</p>
                      <p className="text-xs text-gray-500">°C</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Berat Badan</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.beratBadan || '-'}</p>
                      <p className="text-xs text-gray-500">kg</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 uppercase mb-1">Tinggi Badan</p>
                      <p className="text-xl font-bold text-[#10B981]">{generatedReport.tinggiBadan || '-'}</p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                  </div>
                </div>

                {/* PHQ-9 Results */}
                {generatedReport.phqResult && (
                  <div>
                    <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">SKRINING DEPRESI (PHQ-9)</h2>
                    <div className="bg-purple-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Skor PHQ-9</p>
                          <p className="text-4xl font-bold text-purple-600">{generatedReport.phqResult.total}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Interpretasi</p>
                          <p className="text-lg font-semibold text-purple-600">{generatedReport.phqResult.interpretasi}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
                        <p className="font-medium text-gray-700 mb-2">Keterangan:</p>
                        <ul className="space-y-1">
                          <li>0-4: Depresi minimal</li>
                          <li>5-9: Depresi ringan</li>
                          <li>10-14: Depresi sedang</li>
                          <li>15-19: Depresi berat</li>
                          <li>20-27: Depresi sangat berat</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* GAD-7 Results */}
                {generatedReport.gadResult && (
                  <div>
                    <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">SKRINING KECEMASAN (GAD-7)</h2>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Skor GAD-7</p>
                          <p className="text-4xl font-bold text-blue-600">{generatedReport.gadResult.total}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Interpretasi</p>
                          <p className="text-lg font-semibold text-blue-600">{generatedReport.gadResult.interpretasi}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
                        <p className="font-medium text-gray-700 mb-2">Keterangan:</p>
                        <ul className="space-y-1">
                          <li>0-4: Kecemasan minimal</li>
                          <li>5-9: Kecemasan ringan</li>
                          <li>10-14: Kecemasan sedang</li>
                          <li>15-19: Kecemasan berat</li>
                          <li>20-21: Kecemasan sangat berat</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {generatedReport.anamnesis && <SectionRow title="ANAMNESIS" content={generatedReport.anamnesis} />}
                {generatedReport.pemeriksaan && <SectionRow title="PEMERIKSAAN FISIK" content={generatedReport.pemeriksaan} />}
                {generatedReport.diagnosis && <SectionRow title="DIAGNOSIS / KESIMPULAN" content={generatedReport.diagnosis} />}
                {generatedReport.terapi && <SectionRow title="TERAPI / REKOMENDASI" content={generatedReport.terapi} />}
                {generatedReport.edukasi && <SectionRow title="EDUKASI PASIEN" content={generatedReport.edukasi} />}
                {generatedReport.selanjutnya && <SectionRow title="RENCANA TINDAK LANJUT" content={generatedReport.selanjutnya} />}
              </>
            )}

            {/* Template IMS */}
            {generatedReport.template === 'ims' && (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-amber-800 text-sm">
                    <strong>Catatan:</strong> Laporan ini berisi informasi sensitif terkait Infeksi Menular Seksual (IMS).
                    Semua data pasien dijamin kerahasiaannya.
                  </p>
                </div>

                {generatedReport.keluhan && (
                  <div>
                    <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">KELUHAN UTAMA</h2>
                    <p className="text-gray-700">{generatedReport.keluhan}</p>
                  </div>
                )}

                {generatedReport.imsRiwayat && <SectionRow title="RIWAYAT KESEHATAN" content={generatedReport.imsRiwayat} />}
                {generatedReport.imsKelamin && <SectionRow title="RIWAYAT KESEHATAN KELAMIN" content={generatedReport.imsKelamin} />}
                {generatedReport.imsGejala && <SectionRow title="GEJALA YANG DIRASAKAN" content={generatedReport.imsGejala} />}
                {generatedReport.imsPemeriksaan && <SectionRow title="PEMERIKSAAN" content={generatedReport.imsPemeriksaan} />}
                {generatedReport.imsDiagnosis && <SectionRow title="DIAGNOSIS" content={generatedReport.imsDiagnosis} />}
                {generatedReport.imsTerapi && <SectionRow title="TERAPI" content={generatedReport.imsTerapi} />}
                {generatedReport.imsEdukasi && <SectionRow title="EDUKASI PASIEN" content={generatedReport.imsEdukasi} />}
                {generatedReport.selanjutnya && <SectionRow title="RENCANA TINDAK LANJUT" content={generatedReport.selanjutnya} />}
              </>
            )}

            {/* TTD Dokter */}
            <div className="pt-16 flex justify-end">
              <div className="text-center">
                <p className="text-gray-500 mb-16">Jakarta, {generatedReport.tanggal}</p>
                <div className="w-32 h-16 bg-gray-200 rounded mx-auto mb-2 flex items-end justify-center pb-1">
                  <img src="/src/img/pasfotosquare.jpg" alt="ttd" className="h-14 object-contain opacity-50" />
                </div>
                <p className="font-semibold text-gray-900">{generatedReport.dokter}</p>
                <p className="text-sm text-gray-500">Dokter Penanggung Jawab</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex justify-end gap-4 no-print">
            <Button variant="outline" onClick={() => setShowReport(false)}>
              Kembali
            </Button>
            <Button onClick={printReport}>
              <Icons.Document /> Cetak Laporan
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ==================== FORM VIEW ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-emerald-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#10B981] to-[#059669] p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icons.Document />
              </div>
              <div>
                <h1 className="text-2xl font-bold">GENERATOR LAPORAN</h1>
                <p className="text-emerald-100 text-sm">Medika Privasi - Pilih Template Laporan</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Template Selector */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-emerald-100">PILIH TEMPLATE</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => changeTemplate(t.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTemplate === t.id
                        ? 'border-[#10B981] bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.desc}</p>
                      </div>
                      {t.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedTemplate === t.id ? 'bg-[#10B981] text-white' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {t.badge}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ========== TEMPLATE UMUM ========== */}
            {selectedTemplate === 'umum' && (
              <>
                {/* Data Pasien */}
                <FormSection title="DATA PASIEN">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Nama Lengkap *" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama pasien" />
                    <InputField label="Umur *" name="umur" value={formData.umur} onChange={handleChange} placeholder="Tahun" type="number" />
                    <SelectField label="Jenis Kelamin *" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} options={[{value: '', label: 'Pilih'}, {value: 'Laki-laki', label: 'Laki-laki'}, {value: 'Perempuan', label: 'Perempuan'}]} />
                    <InputField label="Tanggal Kunjungan" name="tanggal" value={formData.tanggal} onChange={handleChange} />
                  </div>
                </FormSection>

                <FormSection title="KELUHAN UTAMA">
                  <TextareaField name="keluhan" value={formData.keluhan} onChange={handleChange} placeholder="Jelaskan keluhan utama pasien..." rows={3} />
                </FormSection>

                <FormSection title="TANDA-TANDA VITAL">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <InputField label="Tekanan Darah" name="tekananDarah" value={formData.tekananDarah} onChange={handleChange} placeholder="120/80" />
                    <InputField label="Detak Jantung" name="detakJantung" value={formData.detakJantung} onChange={handleChange} placeholder="80" />
                    <InputField label="Suhu Tubuh" name="suhuTubuh" value={formData.suhuTubuh} onChange={handleChange} placeholder="36.5" />
                    <InputField label="Berat Badan (kg)" name="beratBadan" value={formData.beratBadan} onChange={handleChange} placeholder="70" type="number" />
                    <InputField label="Tinggi Badan (cm)" name="tinggiBadan" value={formData.tinggiBadan} onChange={handleChange} placeholder="170" type="number" />
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={calculateIMT}>Hitung IMT</Button>
                    {formData.imt && <span className="text-sm text-gray-600">IMT: <strong>{formData.imt}</strong></span>}
                  </div>
                </FormSection>

                <FormSection title="ANAMNESIS">
                  <TextareaField name="anamnesis" value={formData.anamnesis} onChange={handleChange} placeholder="Riwayat penyakit, keluhan yang dirasakan, dll..." rows={4} />
                </FormSection>

                <FormSection title="PEMERIKSAAN FISIK">
                  <TextareaField name="pemeriksaan" value={formData.pemeriksaan} onChange={handleChange} placeholder="Hasil pemeriksaan fisik..." rows={4} />
                </FormSection>

                <FormSection title="DIAGNOSIS / KESIMPULAN">
                  <TextareaField name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="Diagnosis kerja / diagnosis banding..." rows={4} />
                </FormSection>

                <FormSection title="TERAPI / REKOMENDASI">
                  <TextareaField name="terapi" value={formData.terapi} onChange={handleChange} placeholder="Therapi yang diberikan, obat-obatan, dll..." rows={4} />
                </FormSection>

                <FormSection title="EDUKASI PASIEN">
                  <TextareaField name="edukasi" value={formData.edukasi} onChange={handleChange} placeholder="Edukasi yang diberikan kepada pasien..." rows={3} />
                </FormSection>

                <FormSection title="RENCANA TINDAK LANJUT">
                  <TextareaField name="selanjutnya" value={formData.selanjutnya} onChange={handleChange} placeholder="Jadwal kontrol, waktu visit berikutnya, dll..." rows={3} />
                </FormSection>
              </>
            )}

            {/* ========== TEMPLATE KESEHATAN MENTAL ========== */}
            {selectedTemplate === 'mental' && (
              <>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-purple-800 text-sm">
                    <strong>Skrining Kesehatan Mental</strong> menggunakan instrumen PHQ-9 (depresi) dan GAD-7 (kecemasan)
                    untuk menilai kondisi kesehatan mental pasien secara komprehensif.
                  </p>
                </div>

                <FormSection title="DATA PASIEN">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Nama Lengkap *" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama pasien" />
                    <InputField label="Umur *" name="umur" value={formData.umur} onChange={handleChange} placeholder="Tahun" type="number" />
                    <SelectField label="Jenis Kelamin *" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} options={[{value: '', label: 'Pilih'}, {value: 'Laki-laki', label: 'Laki-laki'}, {value: 'Perempuan', label: 'Perempuan'}]} />
                    <InputField label="Tanggal Kunjungan" name="tanggal" value={formData.tanggal} onChange={handleChange} />
                  </div>
                </FormSection>

                <FormSection title="KELUHAN UTAMA">
                  <TextareaField name="keluhan" value={formData.keluhan} onChange={handleChange} placeholder="Jelaskan keluhan utama pasien..." rows={3} />
                </FormSection>

                <FormSection title="TANDA-TANDA VITAL">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <InputField label="Tekanan Darah" name="tekananDarah" value={formData.tekananDarah} onChange={handleChange} placeholder="120/80" />
                    <InputField label="Detak Jantung" name="detakJantung" value={formData.detakJantung} onChange={handleChange} placeholder="80" />
                    <InputField label="Suhu Tubuh" name="suhuTubuh" value={formData.suhuTubuh} onChange={handleChange} placeholder="36.5" />
                    <InputField label="Berat Badan" name="beratBadan" value={formData.beratBadan} onChange={handleChange} placeholder="kg" type="number" />
                    <InputField label="Tinggi Badan" name="tinggiBadan" value={formData.tinggiBadan} onChange={handleChange} placeholder="cm" type="number" />
                  </div>
                </FormSection>

                {/* PHQ-9 */}
                <FormSection title="SKRINING DEPRESI (PHQ-9)">
                  <p className="text-sm text-gray-600 mb-4">Selama 2 minggu terakhir, seberapa sering Anda terganggu oleh masalah berikut?</p>
                  <div className="space-y-3">
                    {[
                      '1. Sedikit minat atau kesenangan dalam melakukan sesuatu',
                      '2. Merasa sedih, tertekan, atau hopeless',
                      '3. Sulit tidur atau terlalu tidur',
                      '4. Merasa lelah atau kurang berenergi',
                      '5. Nafsu makan buruk atau terlalu banyak makan',
                      '6. Merasa buruk tentang diri sendiri atau gagal',
                      '7. Sulit concentrate dalam membaca atau aktivitas lain',
                      '8. Bergerak atau berbicara sangat lambat / terlalu gelisah',
                      '9. Thoughts bahwa Anda lebih baik mati atau menyakiti diri',
                    ].map((q, i) => (
                      <SelectField key={i} label={q} name={`phq${i+1}`} value={formData[`phq${i+1}`]} onChange={handleChange} options={scaleOptions} />
                    ))}
                  </div>
                  {calculatePHQ() && (
                    <div className="mt-4 bg-purple-50 rounded-xl p-4">
                      <p className="text-purple-800">Skor PHQ-9: <strong>{calculatePHQ().total}</strong> ({calculatePHQ().interpretasi})</p>
                    </div>
                  )}
                </FormSection>

                {/* GAD-7 */}
                <FormSection title="SKRINING KECEMASAN (GAD-7)">
                  <p className="text-sm text-gray-600 mb-4">Selama 2 minggu terakhir, seberapa sering Anda terganggu oleh masalah berikut?</p>
                  <div className="space-y-3">
                    {[
                      '1. Merasa gelisah, cemas, atau sangat tegang',
                      '2. Tidak bisa berhenti khawatir atau kontrol worry',
                      '3. Terlalu khawatir tentang berbagai hal',
                      '4. Sulit rileks',
                      '5. Sangat gelisah sampai sulit duduk diam',
                      '6. Mudah marah atau cepat tersinggung',
                      '7. Merasa takut, seperti ada sesuatu yang mengerikan',
                    ].map((q, i) => (
                      <SelectField key={i} label={q} name={`gad${i+1}`} value={formData[`gad${i+1}`]} onChange={handleChange} options={scaleOptions} />
                    ))}
                  </div>
                  {calculateGAD() && (
                    <div className="mt-4 bg-blue-50 rounded-xl p-4">
                      <p className="text-blue-800">Skor GAD-7: <strong>{calculateGAD().total}</strong> ({calculateGAD().interpretasi})</p>
                    </div>
                  )}
                </FormSection>

                <FormSection title="ANAMNESIS">
                  <TextareaField name="anamnesis" value={formData.anamnesis} onChange={handleChange} placeholder="Riwayat penyakit, riwayat mental health sebelumnya, dll..." rows={4} />
                </FormSection>

                <FormSection title="PEMERIKSAAN FISIK">
                  <TextareaField name="pemeriksaan" value={formData.pemeriksaan} onChange={handleChange} placeholder="Hasil pemeriksaan fisik..." rows={4} />
                </FormSection>

                <FormSection title="DIAGNOSIS / KESIMPULAN">
                  <TextareaField name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="Diagnosis kerja / diagnosis banding..." rows={4} />
                </FormSection>

                <FormSection title="TERAPI / REKOMENDASI">
                  <TextareaField name="terapi" value={formData.terapi} onChange={handleChange} placeholder="Therapi, obat-obatan, rujukan, dll..." rows={4} />
                </FormSection>

                <FormSection title="EDUKASI PASIEN">
                  <TextareaField name="edukasi" value={formData.edukasi} onChange={handleChange} placeholder="Edukasi yang diberikan kepada pasien..." rows={3} />
                </FormSection>

                <FormSection title="RENCANA TINDAK LANJUT">
                  <TextareaField name="selanjutnya" value={formData.selanjutnya} onChange={handleChange} placeholder="Jadwal kontrol, follow-up, rujukan, dll..." rows={3} />
                </FormSection>
              </>
            )}

            {/* ========== TEMPLATE IMS ========== */}
            {selectedTemplate === 'ims' && (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Edukasi IMS</strong> - Dokumen ini berisi informasi sensitif terkait Infeksi Menular Seksual.
                    Semua data dan informasi pasien dijamin kerahasiaannya (HIPAA compliant).
                  </p>
                </div>

                <FormSection title="DATA PASIEN">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Nama Lengkap *" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama pasien" />
                    <InputField label="Umur *" name="umur" value={formData.umur} onChange={handleChange} placeholder="Tahun" type="number" />
                    <SelectField label="Jenis Kelamin *" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} options={[{value: '', label: 'Pilih'}, {value: 'Laki-laki', label: 'Laki-laki'}, {value: 'Perempuan', label: 'Perempuan'}]} />
                    <InputField label="Tanggal Kunjungan" name="tanggal" value={formData.tanggal} onChange={handleChange} />
                  </div>
                </FormSection>

                <FormSection title="KELUHAN UTAMA">
                  <TextareaField name="keluhan" value={formData.keluhan} onChange={handleChange} placeholder="Jelaskan keluhan utama pasien..." rows={3} />
                </FormSection>

                <FormSection title="RIWAYAT KESEHATAN">
                  <TextareaField name="imsRiwayat" value={formData.imsRiwayat} onChange={handleChange} placeholder="Riwayat penyakit umum, alergi, operasi sebelumnya..." rows={4} />
                </FormSection>

                <FormSection title="RIWAYAT KESEHATAN KELAMIN">
                  <TextareaField name="imsKelamin" value={formData.imsKelamin} onChange={handleChange} placeholder="Riwayat IMS sebelumnya, keluhan genital, aktivitas seksual, penggunaan kondom, dll..." rows={4} />
                </FormSection>

                <FormSection title="GEJALA YANG DIRASAKAN">
                  <TextareaField name="imsGejala" value={formData.imsGejala} onChange={handleChange} placeholder="Gejala yang dirasakan pasien terkait keluhan genital/IMS..." rows={4} />
                </FormSection>

                <FormSection title="PEMERIKSAAN">
                  <TextareaField name="imsPemeriksaan" value={formData.imsPemeriksaan} onChange={handleChange} placeholder="Hasil pemeriksaan fisik genital, tes laboratorium (VCT, syphilis, HIV, dll)..." rows={4} />
                </FormSection>

                <FormSection title="DIAGNOSIS">
                  <TextareaField name="imsDiagnosis" value={formData.imsDiagnosis} onChange={handleChange} placeholder="Diagnosis IMS (Gonore, Chlamydia, Sifilis, Herpes, HPV, HIV, dll)..." rows={4} />
                </FormSection>

                <FormSection title="TERAPI">
                  <TextareaField name="imsTerapi" value={formData.imsTerapi} onChange={handleChange} placeholder="Regimen terapi antibiotik/antiviral, dosis, durasi, follow-up..." rows={4} />
                </FormSection>

                <FormSection title="EDUKASI PASIEN">
                  <TextareaField name="imsEdukasi" value={formData.imsEdukasi} onChange={handleChange} placeholder="Edukasi tentang IMS, pencegahan, pentingnya pengobatan pasangan, abstinence, penggunaan kondom..." rows={4} />
                </FormSection>

                <FormSection title="RENCANA TINDAK LANJUT">
                  <TextareaField name="selanjutnya" value={formData.selanjutnya} onChange={handleChange} placeholder="Jadwal kontrol, tes ulang, notification ke partner, rujukan..." rows={3} />
                </FormSection>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={generateReport} className="flex-1">
                <Icons.Document /> Generate Laporan
              </Button>
              <Button variant="outline" onClick={resetForm} className="flex-1">
                Reset Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function FormSection({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-emerald-100">{title}</h2>
      {children}
    </div>
  )
}

function InputField({ label, name, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}

function TextareaField({ name, value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none"
      placeholder={placeholder}
    />
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent outline-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function SectionRow({ title, content }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-[#10B981] mb-4 pb-2 border-b-2 border-emerald-100">{title}</h2>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  )
}
