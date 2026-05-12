import { Send, ChevronRight } from 'lucide-react'

export default function FinalCTA({ onOrderOpen }) {
  return (
    <section className="py-20" style={{ background: 'var(--color-primary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Готовы попробовать?
        </h2>
        <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.85)' }}>
          Начните с пробного набора на 3 дня — без подписки и обязательств.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-xl transition-colors"
            style={{ background: 'white', color: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}
          >
            Собрать набор
            <ChevronRight size={16} />
          </a>
          <a
            href="https://t.me/easyfood_beograd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl transition-colors"
            style={{ border: '2px solid white', color: 'white', borderRadius: 'var(--radius-btn)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Send size={16} />
            Написать в Telegram
          </a>
        </div>

        <p className="text-sm mt-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Оплата после подтверждения заказа · Доставка по Белграду
        </p>
      </div>
    </section>
  )
}
