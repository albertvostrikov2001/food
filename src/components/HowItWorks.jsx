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
    <section id="how" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
            Как работает Porta
          </h2>
          <p className="text-[#6B7280]">От выбора до холодильника — за несколько минут</p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-[#E5E0D8] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  {/* Number + icon bubble */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-2xl bg-[#F0FFF4] border-2 border-[#52B788] flex items-center justify-center">
                      <Icon size={30} className="text-[#2D6A4F]" />
                    </div>
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#2D6A4F] text-white text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
