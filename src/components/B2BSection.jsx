import { Truck, Users, Calculator } from 'lucide-react'

const cards = [
  {
    icon: Truck,
    title: 'Офисные наборы',
    description: 'Регулярные поставки 1–2 раза в неделю. Еда всегда есть на кухне, не нужно думать о заказах каждый день.',
  },
  {
    icon: Users,
    title: 'Питание для команды',
    description: 'От 3 до 30+ человек. Рассчитаем количество, подберём меню, согласуем удобное время.',
  },
  {
    icon: Calculator,
    title: 'Индивидуальный расчёт',
    description: 'Подберём состав и объём под ваш офис. Без стандартных шаблонов — только то, что нужно именно вам.',
  },
]

export default function B2BSection({ onOrderOpen }) {
  return (
    <section id="b2b" className="py-16" style={{ background: 'var(--color-surface-warm)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-muted)' }}
          >
            Для бизнеса
          </span>
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">
            Питание для офиса в Белграде
          </h2>
          <p className="text-[#5A4D44] text-lg">
            Рассчитаем питание для команды индивидуально. Без Excel, без мессенджеров — просто оставьте заявку.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={i}
                className="bg-white p-6"
                style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--color-primary-light)' }}
                >
                  <Icon size={22} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-bold text-[#1C1C1C] mb-2">{card.title}</h3>
                <p className="text-sm text-[#5A4D44] leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => onOrderOpen && onOrderOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold transition-colors"
          style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          Получить предложение для офиса
        </button>
      </div>
    </section>
  )
}
