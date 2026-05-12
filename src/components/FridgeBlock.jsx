export default function FridgeBlock({ onOrder }) {
  return (
    <section className="py-16" style={{ background: 'var(--color-surface-warm)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card-hover)' }}>

          {/* Image */}
          <div className="md:w-1/2 h-64 md:h-auto min-h-[280px] flex-none overflow-hidden">
            <img
              src="/food/images/fridge.jpg"
              alt="Еда на несколько дней уже в холодильнике — пример"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 flex flex-col justify-center p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1C1C1C] tracking-tight mb-6 leading-snug">
              Еда на несколько дней<br/>уже в холодильнике
            </h2>

            <ul className="space-y-4 mb-8">
              {[
                "Не нужно каждый вечер думать, что приготовить.",
                "Откройте холодильник, выберите блюдо, разогрейте — и можно есть.",
                "Удобно для будней, работы из дома и вечеров без готовки.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-none w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-primary)' }}>✓</span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{text}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={onOrder}
              className="px-8 py-3 font-semibold text-white w-fit transition-colors"
              style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
            >
              Собрать набор
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
