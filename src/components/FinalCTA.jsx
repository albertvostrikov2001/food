import { ChevronRight, Send } from 'lucide-react'

export default function FinalCTA({ onOrderOpen }) {
  return (
    <section className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden flex flex-col md:flex-row"
          style={{ borderRadius: '28px', background: 'var(--color-primary)', boxShadow: '0 8px 40px rgba(208,57,94,0.3)' }}
        >
          {/* Food photo */}
          <div className="md:w-2/5 h-56 md:h-auto min-h-[260px] flex-none overflow-hidden">
            <img
              src="/food/images/hero-side-2.jpg"
              alt="Аппетитный набор блюд — пример"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CTA content */}
          <div className="md:w-3/5 flex flex-col justify-center p-8 lg:p-14">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4 leading-snug">
              Готовы попробовать<br />
              <span style={{ color: 'var(--color-accent)' }}>без риска?</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.88)' }}>
              Начните с пробного набора на 3 дня — без подписки и обязательств.
              Выберите блюда, которые нравятся, и оставьте заявку.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={onOrderOpen}
                className="inline-flex items-center gap-2 px-8 py-3.5 font-bold transition-all"
                style={{ background: 'white', color: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'none'; }}
              >
                Хочу попробовать
                <ChevronRight size={16} />
              </button>
              <a
                href="https://t.me/easyfood_beograd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold transition-all"
                style={{ border: '2px solid rgba(255,255,255,0.6)', color: 'white', borderRadius: 'var(--radius-btn)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Send size={16} />
                Написать в Telegram
              </a>
            </div>

            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Оплата после подтверждения заказа · Доставка по Белграду
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
