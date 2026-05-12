import { Clock, Snowflake, Truck, CheckCircle, MapPin, ChevronRight } from 'lucide-react'
import { meals } from '../data/meals'
import MealCard from './MealCard'

const facts = [
  { icon: Clock, text: '3–7 минут на разогрев' },
  { icon: Snowflake, text: 'Хранение 7–10 дней' },
  { icon: Truck, text: '1–2 доставки в неделю' },
  { icon: CheckCircle, text: 'Без подписки' },
  { icon: MapPin, text: 'Белград' },
]

const tickerItems = [
  'Готовая еда на неделю',
  'Хранение 7–10 дней',
  'Разогрев за 3–7 минут',
  'Без подписки',
  'Доставка по Белграду',
  'Замена любого блюда',
  'Оплата после подтверждения',
]

const heroMeals = meals.filter((m) =>
  ['meal_08', 'meal_02', 'meal_13', 'meal_11'].includes(m.id)
)

export default function Hero({ onOrderOpen }) {
  return (
    <section className="bg-[#FAFAF8] pt-10 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F0FFF4] border border-[#52B788] text-[#2D6A4F] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
              Белград · Готовая еда · Доставка
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight leading-[1.1] mb-5">
              Готовая еда<br />
              <span className="text-[#2D6A4F]">на неделю</span>{' '}
              в Белграде
            </h1>

            <p className="text-lg text-[#6B7280] leading-relaxed mb-8 max-w-lg">
              Выберите блюда, соберите набор, оставьте заявку — мы подтвердим
              заказ и доставим готовую еду на несколько дней вперёд.
            </p>

            {/* Quick facts */}
            <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                  <Icon size={16} className="text-[#2D6A4F] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#2D6A4F] text-white font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
              >
                Собрать набор
                <ChevronRight size={16} />
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-1.5 px-6 py-3 border border-[#2D6A4F] text-[#2D6A4F] font-semibold rounded-xl hover:bg-[#F0FFF4] transition-colors"
              >
                Посмотреть меню
              </a>
              <a
                href="#b2b"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-[#2D6A4F] font-medium text-sm hover:underline transition-colors"
              >
                Питание для офиса →
              </a>
            </div>
          </div>

          {/* Right column — meal grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {heroMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} mode="compact" />
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-10 bg-[#2D6A4F] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white text-sm font-medium mx-6">
              {item}
              <span className="text-[#52B788]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
