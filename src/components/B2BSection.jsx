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
        <div className="rounded-3xl overflow-hidden flex flex-col lg:flex-row" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card-hover)' }}>

          {/* Office photo */}
          <div className="lg:w-2/5 h-56 lg:h-auto flex-none overflow-hidden">
            <img
              src="/food/images/b2b-office.jpg"
              alt="Офисный ланч — пример сервиса для команды"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:w-3/5 p-8 lg:p-12">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-muted)' }}
            >
              Для бизнеса
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">
              Питание для офиса в Белграде
            </h2>
            <p className="text-[#5A4D44] mb-6">
              Рассчитаем питание для команды индивидуально. Без Excel, без мессенджеров — просто оставьте заявку.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {cards.map((card, i) => {
                const Icon = card.icon
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--color-primary-light)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h3 className="font-bold text-[#1C1C1C] text-sm">{card.title}</h3>
                    <p className="text-xs text-[#5A4D44] leading-relaxed">{card.description}</p>
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
              Питание для офиса
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
