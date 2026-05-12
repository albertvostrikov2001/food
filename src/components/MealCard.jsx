import { useState } from 'react'
import { ShoppingCart, RefreshCw, ArrowRight } from 'lucide-react'
import { meals } from '../data/meals'
import { useCart } from '../context/CartContext'

const categoryEmoji = {
  breakfast: '🍳',
  soup: '🍲',
  salad: '🥗',
  office: '🥙',
  lunch: '🍽️',
  dinner: '🍽️',
}

const badgeStyle = {
  primary: { background: 'var(--color-primary-light)', color: 'var(--color-primary)' },
  accent:  { background: 'var(--color-accent-light)',  color: 'var(--color-accent)' },
}

function getBadgeStyle(badge) {
  const accentBadges = ['для офиса', 'без острого', 'новинка']
  return accentBadges.includes(badge) ? badgeStyle.accent : badgeStyle.primary
}

const FALLBACK = (category) => `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150'><rect fill='%23F5EDE2' width='200' height='150'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='32'>${categoryEmoji[category] || '🍽️'}</text></svg>`

function FoodImage({ meal, className, style }) {
  const [failed, setFailed] = useState(false)
  const src = failed || !meal.image ? FALLBACK(meal.category) : meal.image
  return (
    <img
      src={src}
      alt={meal.imageAlt || meal.name}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function MealCard({
  meal,
  mode = 'full',
  onReplace,
  itemIndex,
  mealIndex,
  replaced = false,
  originalMealId,
}) {
  const { dispatch } = useCart()
  const [showAlts, setShowAlts] = useState(false)

  const alternatives = meals.filter(
    (m) => m.category === meal.category && m.id !== meal.id
  )

  function handleAddToCart() {
    dispatch({ type: 'ADD_MEAL', mealId: meal.id })
  }

  function handleSelectAlt(newMeal) {
    if (onReplace) onReplace(itemIndex, mealIndex, newMeal.id)
    setShowAlts(false)
  }

  if (mode === 'compact') {
    return (
      <div className="bg-white overflow-hidden" style={{ borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
        <div className="aspect-[4/3] overflow-hidden">
          <FoodImage meal={meal} className="w-full h-full object-cover" />
        </div>
        <div className="p-3">
          <p className="text-xs font-semibold text-[#1C1C1C] line-clamp-1 leading-tight">{meal.name}</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: 'var(--color-primary)' }}>{meal.price} RSD</p>
        </div>
      </div>
    )
  }

  if (mode === 'set') {
    const orig = originalMealId && originalMealId !== meal.id
      ? meals.find((m) => m.id === originalMealId)
      : null

    return (
      <div className="bg-white rounded-xl border border-[#EDE5DC]">
        <div className="flex items-center gap-3 p-3">
          <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden">
            <FoodImage meal={meal} className="w-full h-full object-cover" style={{ borderRadius: '12px' }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full text-[#9E8E84]" style={{ background: 'var(--color-beige)' }}>
                {meal.categoryLabel}
              </span>
              {replaced && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  Заменено
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-[#1C1C1C] line-clamp-1 mt-1">
              {orig && (
                <span className="text-[#9E8E84] line-through mr-1 font-normal text-xs">{orig.name}</span>
              )}
              {orig && <ArrowRight size={10} className="inline mr-1" style={{ color: 'var(--color-primary)' }} />}
              {meal.name}
            </p>
            <p className="text-xs text-[#9E8E84]">{meal.weight} г · {meal.calories} ккал</p>
          </div>

          <div className="shrink-0 text-right flex flex-col items-end gap-1.5">
            <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{meal.price} RSD</span>
            {onReplace && (
              <button
                onClick={() => setShowAlts(!showAlts)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ border: '1px solid var(--color-primary)', color: 'var(--color-primary)', background: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <RefreshCw size={11} />
                Заменить
              </button>
            )}
          </div>
        </div>

        {/* Alternatives */}
        {showAlts && (
          <div className="border-t border-[#EDE5DC] p-3" style={{ background: 'var(--color-surface)' }}>
            <p className="text-xs font-semibold text-[#9E8E84] mb-2">
              Выберите замену ({meal.categoryLabel}):
            </p>
            {alternatives.length === 0 ? (
              <p className="text-xs text-[#9E8E84]">Нет альтернатив в этой категории</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {alternatives.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => handleSelectAlt(alt)}
                    className="flex items-center gap-3 p-2 rounded-lg transition-colors text-left"
                    style={{ border: '1px solid transparent', borderRadius: 'var(--radius-badge)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-none">
                      <FoodImage meal={alt} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm text-[#1C1C1C] line-clamp-1 flex-1">{alt.name}</span>
                    <span className="text-sm font-semibold shrink-0" style={{ color: 'var(--color-primary)' }}>
                      {alt.price} RSD
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button onClick={() => setShowAlts(false)} className="mt-2 text-xs text-[#9E8E84] hover:text-[#1C1C1C]">
              Отмена
            </button>
          </div>
        )}
      </div>
    )
  }

  // mode="full"
  return (
    <div
      className="bg-white flex flex-col overflow-hidden transition-all duration-200 cursor-default group"
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}>
        <FoodImage
          meal={meal}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {meal.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {meal.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                style={{ ...getBadgeStyle(badge), borderRadius: 'var(--radius-badge)' }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full text-[#9E8E84]" style={{ background: 'var(--color-beige)' }}>
            {meal.categoryLabel}
          </span>
          <span className="text-xs text-[#9E8E84]">{meal.weight} г</span>
        </div>

        <h3 className="font-semibold text-[#1C1C1C] text-sm leading-snug mb-1 line-clamp-2">{meal.name}</h3>
        <p className="text-xs text-[#5A4D44] line-clamp-2 mb-3 flex-1">{meal.description}</p>

        <div className="flex gap-3 text-xs text-[#9E8E84] mb-3 border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
          <span><b className="text-[#1C1C1C]">{meal.calories}</b> ккал</span>
          <span><b className="text-[#1C1C1C]">{meal.protein}</b>б</span>
          <span><b className="text-[#1C1C1C]">{meal.fat}</b>ж</span>
          <span><b className="text-[#1C1C1C]">{meal.carbs}</b>у</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-xl" style={{ color: 'var(--color-primary)' }}>{meal.price} RSD</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-semibold transition-colors"
            style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            <ShoppingCart size={13} />
            В набор
          </button>
        </div>
      </div>
    </div>
  )
}
