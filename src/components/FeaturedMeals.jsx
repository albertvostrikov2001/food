import { useCart } from '../context/CartContext'
import { meals, featuredMealIds } from '../data/meals'

const taglines = {
  meal_08: "Сытный обед без готовки",
  meal_10: "Классика — разогрейте за 5 минут",
  meal_11: "Ресторанный уровень, всегда под рукой",
  meal_13: "Готовый ужин уже ждёт в холодильнике",
  meal_16: "Нормальная еда на каждый день",
  meal_02: "Сытный завтрак — без суеты",
  meal_17: "Свежий салат — откройте и ешьте",
  meal_19: "Готовый ланч для офиса",
}

function FeaturedCard({ meal }) {
  const { dispatch } = useCart()

  return (
    <div
      className="group relative bg-white overflow-hidden flex flex-col"
      style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)' }}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}>
        <img
          src={meal.image}
          alt={meal.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.background = 'var(--color-beige)'; }}
        />
        {/* Badges */}
        {meal.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {meal.badges.slice(0, 1).map((b) => (
              <span key={b} className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-badge)' }}>
                {b}
              </span>
            ))}
          </div>
        )}
        {/* Price overlay */}
        <div className="absolute bottom-2 right-2">
          <span className="text-sm font-extrabold px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--color-primary)', backdropFilter: 'blur(4px)' }}>
            {meal.price} RSD
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm text-[#1C1C1C] leading-snug mb-1 line-clamp-1">{meal.name}</h3>
        <p className="text-xs mb-3 flex-1" style={{ color: 'var(--color-text-secondary)' }}>
          {taglines[meal.id] || meal.tagline}
        </p>
        <button
          onClick={() => dispatch({ type: 'ADD_MEAL', mealId: meal.id })}
          className="w-full py-2 text-white text-xs font-semibold transition-colors"
          style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          + В набор
        </button>
      </div>
    </div>
  )
}

export default function FeaturedMeals() {
  const featured = featuredMealIds.map(id => meals.find(m => m.id === id)).filter(Boolean)

  return (
    <section className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-1">
              Самые аппетитные блюда недели
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Пример меню — демо-контент, так может выглядеть ваш набор
            </p>
          </div>
          <a href="#menu" className="text-sm font-semibold hover:underline whitespace-nowrap" style={{ color: 'var(--color-primary)' }}>
            Все блюда →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map(meal => (
            <FeaturedCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </section>
  )
}
