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
  'Вкусно. Быстро. Всегда под рукой',
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
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8F3 0%, #FFF1E6 100%)' }}>
      {/* Decorative blobs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'var(--color-primary-muted)', opacity: 0.18, filter: 'blur(60px)', zIndex: 0 }}
      />
      <div
        className="absolute bottom-[-40px] left-[-60px] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'var(--color-accent-light)', opacity: 0.35, filter: 'blur(50px)', zIndex: 0 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-[#D0395E] text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'var(--color-primary-light)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#D0395E] animate-pulse" />
              🍽 Белград · Готовая еда · Доставка
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1C1C1C] tracking-tight leading-[1.1] mb-5" style={{ letterSpacing: '-0.03em' }}>
              Готовая еда<br />
              <span className="text-[#D0395E]">на неделю</span>{' '}
              в Белграде
            </h1>

            <p className="text-lg text-[#5A4D44] leading-relaxed mb-3 max-w-lg">
              Выберите блюда, соберите набор, оставьте заявку — мы подтвердим
              заказ и доставим готовую еду на несколько дней вперёд.
            </p>
            <p className="text-sm text-[#9E8E84] mb-8 max-w-lg italic">
              Легче, чем готовить самому. Быстрее, чем ждать доставку.
            </p>

            {/* Quick facts */}
            <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm text-[#5A4D44]">
                  <Icon size={16} className="text-[#D0395E] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-1.5 px-6 py-3 text-white font-semibold rounded-xl transition-colors"
                style={{
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-btn)',
                  boxShadow: '0 4px 14px rgba(208,57,94,0.3)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                Собрать набор
                <ChevronRight size={16} />
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-1.5 px-6 py-3 font-semibold rounded-xl transition-colors"
                style={{
                  border: '2px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  background: 'transparent',
                  borderRadius: 'var(--radius-btn)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Посмотреть меню
              </a>
              <a
                href="#b2b"
                className="inline-flex items-center gap-1.5 px-4 py-3 font-medium text-sm hover:underline transition-colors"
                style={{ color: 'var(--color-primary)' }}
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
      <div className="mt-12 py-3 overflow-hidden" style={{ background: 'var(--color-beige)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-[#5A4D44] text-sm font-medium mx-6">
              {item}
              <span className="text-[#D0395E]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
