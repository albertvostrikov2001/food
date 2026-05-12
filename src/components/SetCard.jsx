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
      className={`relative bg-white rounded-2xl border-2 shadow-sm flex flex-col h-full transition-shadow hover:shadow-md ${
        set.highlight
          ? 'border-[#2D6A4F]'
          : 'border-[#E5E0D8]'
      }`}
    >
      {/* Badge */}
      {set.badge && (
        <div
          className={`absolute -top-3 right-4 px-3 py-1 text-xs font-bold rounded-full shadow ${
            set.highlight
              ? 'bg-[#2D6A4F] text-white'
              : 'bg-[#F2EDE4] text-[#6B7280]'
          }`}
        >
          {set.highlight && <Star size={10} className="inline mr-1" />}
          {set.badge}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#1A1A1A] mb-1">{set.name}</h3>
        <p className="text-sm text-[#2D6A4F] font-medium mb-2">{set.tagline}</p>
        <p className="text-sm text-[#6B7280] mb-4 flex-1">{set.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Calendar size={13} className="text-[#2D6A4F]" />
            {set.days} {set.days === 1 ? 'день' : set.days < 5 ? 'дня' : 'дней'}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Users size={13} className="text-[#2D6A4F]" />
            {set.forPersons === 1 ? '1 человек' : `${set.forPersons} человека`}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Package size={13} className="text-[#2D6A4F]" />
            {set.totalMeals} блюд
          </span>
        </div>

        {/* Preview meals */}
        <div className="flex flex-col gap-1 mb-4">
          {previewMeals.map((m, i) => {
            const meal = getMealById(m.currentMealId)
            if (!meal) return null
            return (
              <div key={i} className="flex items-center gap-2 text-xs text-[#6B7280]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] shrink-0" />
                {meal.name}
              </div>
            )
          })}
          {set.meals.length > 3 && (
            <p className="text-xs text-[#6B7280] ml-3.5">
              + ещё {set.meals.length - 3} блюд
            </p>
          )}
        </div>

        {/* Price block */}
        <div className="border-t border-[#E5E0D8] pt-4 mb-4">
          <div className="flex items-end gap-3">
            <span className="text-2xl font-bold text-[#1A1A1A]">{set.price.toLocaleString()} RSD</span>
            {set.saving > 0 && (
              <>
                <span className="text-sm text-[#6B7280] line-through">
                  {set.basePrice.toLocaleString()} RSD
                </span>
                <span className="text-xs font-semibold text-[#2D6A4F] bg-[#F0FFF4] px-2 py-0.5 rounded-full">
                  −{set.saving.toLocaleString()} RSD
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-[#6B7280] mt-1">Оплата после подтверждения заказа</p>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-3 font-semibold rounded-xl transition-colors text-sm ${
            set.highlight
              ? 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]'
              : 'border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#F0FFF4]'
          }`}
        >
          {set.cta}
        </button>
      </div>
    </div>
  )
}
