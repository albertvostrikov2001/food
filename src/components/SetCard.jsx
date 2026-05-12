import { Users, Calendar, Package, Star } from 'lucide-react'
import { getMealById } from '../data/meals'
import { useCart } from '../context/CartContext'

export default function SetCard({ set, onOrder }) {
  const { dispatch } = useCart()
  const previewMeals = set.meals.slice(0, 3)

  function handleAdd() {
    dispatch({ type: 'ADD_SET', set })
    if (onOrder) onOrder()
  }

  return (
    <div
      className="relative bg-white flex flex-col h-full transition-shadow hover:shadow-lg"
      style={{
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        border: set.highlight ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
      }}
    >
      {/* Badge */}
      {set.badge && (
        <div
          className="absolute -top-3 right-4 px-3 py-1 text-xs font-bold rounded-full shadow"
          style={
            set.highlight
              ? { background: 'var(--color-primary)', color: 'white' }
              : { background: 'var(--color-primary-light)', color: 'var(--color-primary)' }
          }
        >
          {set.highlight && <Star size={10} className="inline mr-1" />}
          {set.badge}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#1C1C1C] mb-1">{set.name}</h3>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-primary)' }}>{set.tagline}</p>
        <p className="text-sm text-[#5A4D44] mb-4 flex-1">{set.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-[#9E8E84]">
            <Calendar size={13} style={{ color: 'var(--color-primary)' }} />
            {set.days} {set.days === 1 ? 'день' : set.days < 5 ? 'дня' : 'дней'}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#9E8E84]">
            <Users size={13} style={{ color: 'var(--color-primary)' }} />
            {set.forPersons === 1 ? '1 человек' : `${set.forPersons} человека`}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#9E8E84]">
            <Package size={13} style={{ color: 'var(--color-primary)' }} />
            {set.totalMeals} блюд
          </span>
        </div>

        {/* Preview meals */}
        <div className="flex flex-col gap-1 mb-4">
          {previewMeals.map((m, i) => {
            const meal = getMealById(m.currentMealId)
            if (!meal) return null
            return (
              <div key={i} className="flex items-center gap-2 text-xs text-[#9E8E84]">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--color-primary-muted)' }} />
                {meal.name}
              </div>
            )
          })}
          {set.meals.length > 3 && (
            <p className="text-xs text-[#9E8E84] ml-3.5">+ ещё {set.meals.length - 3} блюд</p>
          )}
        </div>

        {/* Price */}
        <div className="border-t pt-4 mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-2xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
              {set.price.toLocaleString()} RSD
            </span>
            {set.saving > 0 && (
              <>
                <span className="text-sm text-[#9E8E84] line-through">{set.basePrice.toLocaleString()} RSD</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)', borderRadius: 'var(--radius-badge)' }}>
                  −{set.saving.toLocaleString()} RSD
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-[#9E8E84] mt-1">Оплата после подтверждения заказа</p>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-3 font-semibold transition-colors text-sm text-white"
          style={{
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-btn)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          {set.cta}
        </button>
      </div>
    </div>
  )
}
