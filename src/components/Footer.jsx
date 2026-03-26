export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-semibold text-lg text-white">Medika Privasi</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja</a>
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
          </div>
          <div className="text-sm">
            © 2026 Medika Privasi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
