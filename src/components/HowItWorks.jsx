import { ShoppingBag, RefreshCw, FileText, Package } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ShoppingBag,
    title: 'Выберите набор',
    description: 'Выберите готовый набор на 3, 5 или 7 дней — или соберите по одному блюду.',
  },
  {
    number: '02',
    icon: RefreshCw,
    title: 'Замените блюда',
    description: 'Не нравится блюдо — замените на другое из той же категории. Цена пересчитается сразу.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Оставьте заявку',
    description: 'Заполните 4 поля: имя, телефон, город, комментарий. Менеджер свяжется для подтверждения.',
  },
  {
    number: '04',
    icon: Package,
    title: 'Получите заказ',
    description: 'Доставим по Белграду в согласованное время. Оплата после подтверждения.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-16" style={{ background: 'var(--color-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">
            Как работает Easy Food
          </h2>
          <p className="text-[#9E8E84]">От выбора до холодильника — за несколько минут</p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) — dashed */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0 z-0"
            style={{ borderTop: '2px dashed var(--color-primary-muted)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    {/* Decorative large number */}
                    <span
                      className="absolute -top-4 -left-2 text-6xl font-extrabold select-none pointer-events-none"
                      style={{ color: 'var(--color-primary)', opacity: 0.12, lineHeight: 1 }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="w-20 h-20 flex items-center justify-center"
                      style={{
                        borderRadius: '20px',
                        background: 'var(--color-primary-light)',
                        border: '2px solid var(--color-primary-muted)',
                      }}
                    >
                      <Icon size={30} style={{ color: 'var(--color-primary)' }} />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5A4D44] leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
