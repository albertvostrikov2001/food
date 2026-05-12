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

const badgeColors = {
  популярное: 'bg-[#2D6A4F] text-white',
  новинка: 'bg-amber-500 text-white',
  'для офиса': 'bg-blue-600 text-white',
  сытное: 'bg-orange-500 text-white',
  'лёгкий ужин': 'bg-[#52B788] text-white',
  'без острого': 'bg-gray-200 text-gray-700',
}

function PlaceholderImage({ meal }) {
  return (
    <div className="w-full h-full bg-[#F2EDE4] flex flex-col items-center justify-center rounded-xl gap-1.5">
      <span className="text-3xl">{categoryEmoji[meal.category] || '🍽️'}</span>
      <span className="text-[10px] text-[#6B7280] text-center px-2 leading-tight line-clamp-2">
        {meal.name}
      </span>
    </div>
  )
}

// mode="full" — card in menu grid
// mode="compact" — hero preview card
// mode="set" — horizontal card inside set builder (with replace button)
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
    if (onReplace) {
      onReplace(itemIndex, mealIndex, newMeal.id)
    }
    setShowAlts(false)
  }

  if (mode === 'compact') {
    return (
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-[#E5E0D8]">
        <div className="aspect-square rounded-xl overflow-hidden mb-2">
          <PlaceholderImage meal={meal} />
        </div>
        <p className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">
          {meal.name}
        </p>
        <p className="text-xs text-[#6B7280] mt-0.5">{meal.price} RSD</p>
      </div>
    )
  }

  if (mode === 'set') {
    const orig = originalMealId && originalMealId !== meal.id
      ? meals.find((m) => m.id === originalMealId)
      : null

    return (
      <div className="bg-white rounded-xl border border-[#E5E0D8]">
        <div className="flex items-center gap-3 p-3">
          {/* Thumb */}
          <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden">
            <PlaceholderImage meal={meal} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap">
              <span className="text-xs px-2 py-0.5 bg-[#F2EDE4] text-[#6B7280] rounded-full shrink-0">
                {meal.categoryLabel}
              </span>
              {replaced && (
                <span className="text-xs px-2 py-0.5 bg-[#F0FFF4] text-[#2D6A4F] border border-[#52B788] rounded-full shrink-0">
                  Заменено
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-[#1A1A1A] line-clamp-1 mt-1">
              {orig && (
                <span className="text-[#6B7280] line-through mr-1 font-normal text-xs">
                  {orig.name}
                </span>
              )}
              {orig && <ArrowRight size={10} className="inline text-[#6B7280] mr-1" />}
              {meal.name}
            </p>
            <p className="text-xs text-[#6B7280]">{meal.weight} г · {meal.calories} ккал</p>
          </div>

          {/* Price + replace */}
          <div className="shrink-0 text-right flex flex-col items-end gap-1.5">
            <span className="text-sm font-bold text-[#1A1A1A]">{meal.price} RSD</span>
            {onReplace && (
              <button
                onClick={() => setShowAlts(!showAlts)}
                className="flex items-center gap-1 text-xs text-[#2D6A4F] border border-[#2D6A4F] px-2 py-1 rounded-lg hover:bg-[#F0FFF4] transition-colors"
              >
                <RefreshCw size={11} />
                Заменить
              </button>
            )}
          </div>
        </div>

        {/* Alternatives dropdown */}
        {showAlts && (
          <div className="border-t border-[#E5E0D8] p-3">
            <p className="text-xs font-semibold text-[#6B7280] mb-2">
              Выберите замену ({meal.categoryLabel}):
            </p>
            {alternatives.length === 0 ? (
              <p className="text-xs text-[#6B7280]">Нет альтернатив в этой категории</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {alternatives.map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => handleSelectAlt(alt)}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-[#F2EDE4] transition-colors text-left"
                  >
                    <span className="text-sm text-[#1A1A1A] line-clamp-1">{alt.name}</span>
                    <span className="text-sm font-semibold text-[#2D6A4F] shrink-0">
                      {alt.price > meal.price ? '+' : alt.price < meal.price ? '' : ''}
                      {alt.price !== meal.price
                        ? `${alt.price > meal.price ? '+' : ''}${alt.price - meal.price} RSD`
                        : `${alt.price} RSD`}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowAlts(false)}
              className="mt-2 text-xs text-[#6B7280] hover:text-[#1A1A1A]"
            >
              Отмена
            </button>
          </div>
        )}
      </div>
    )
  }

  // mode="full"
  return (
    <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <PlaceholderImage meal={meal} />
        {/* Badges */}
        {meal.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {meal.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[badge] || 'bg-gray-200 text-gray-700'}`}
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
          <span className="text-xs px-2 py-0.5 bg-[#F2EDE4] text-[#6B7280] rounded-full">
            {meal.categoryLabel}
          </span>
          <span className="text-xs text-[#6B7280]">{meal.weight} г</span>
        </div>

        <h3 className="font-semibold text-[#1A1A1A] text-sm leading-snug mb-1 line-clamp-2">
          {meal.name}
        </h3>
        <p className="text-xs text-[#6B7280] line-clamp-2 mb-3 flex-1">
          {meal.description}
        </p>

        {/* КБЖУ */}
        <div className="flex gap-3 text-xs text-[#6B7280] mb-3 border-t border-[#E5E0D8] pt-3">
          <span><b className="text-[#1A1A1A]">{meal.calories}</b> ккал</span>
          <span><b className="text-[#1A1A1A]">{meal.protein}</b>б</span>
          <span><b className="text-[#1A1A1A]">{meal.fat}</b>ж</span>
          <span><b className="text-[#1A1A1A]">{meal.carbs}</b>у</span>
        </div>

        {/* Price + button */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-base text-[#1A1A1A]">{meal.price} RSD</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#2D6A4F] text-white text-xs font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
          >
            <ShoppingCart size={13} />
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}
