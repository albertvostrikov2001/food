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
    <section id="b2b" className="py-16 bg-[#F2EDE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="inline-block text-xs font-semibold text-[#2D6A4F] bg-[#F0FFF4] border border-[#52B788] px-3 py-1 rounded-full mb-4">
            Для бизнеса
          </span>
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
            Питание для офиса в Белграде
          </h2>
          <p className="text-[#6B7280] text-lg">
            Рассчитаем питание для команды индивидуально. Без Excel, без мессенджеров — просто оставьте заявку.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#F0FFF4] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">{card.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => onOrderOpen && onOrderOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2D6A4F] text-white font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
        >
          Оставить заявку для офиса
        </button>
      </div>
    </section>
  )
}
