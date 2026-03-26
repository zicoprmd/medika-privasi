export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full'
  const variants = {
    primary: 'bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur',
    outline: 'border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  )
}

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

export function Card({ children, className = '', highlighted = false }) {
  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      highlighted
        ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-xl shadow-emerald-500/20'
        : 'bg-white shadow-lg shadow-gray-200/50 border border-gray-100'
    } ${className}`}>
      {children}
    </div>
  )
}
