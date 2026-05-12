import { X, ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getMealById } from '../data/meals'

function SetItem({ item, index }) {
  const { dispatch } = useCart()
  const replacedMeals = item.meals.filter((m) => m.replaced)

  return (
    <div className="bg-[#FAFAF8] rounded-xl p-3 border border-[#E5E0D8]">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-sm text-[#1A1A1A]">{item.setName}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">
            {item.meals.length} блюд
            {replacedMeals.length > 0 && ` · ${replacedMeals.length} заменено`}
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}
          className="text-[#6B7280] hover:text-red-500 transition-colors p-1"
          aria-label="Удалить"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {replacedMeals.length > 0 && (
        <div className="mb-2 flex flex-col gap-1">
          {replacedMeals.slice(0, 3).map((m, i) => {
            const orig = getMealById(m.originalMealId)
            const curr = getMealById(m.currentMealId)
            return (
              <p key={i} className="text-xs text-[#6B7280]">
                <span className="line-through">{orig?.name}</span>
                {' → '}
                <span className="text-[#2D6A4F]">{curr?.name}</span>
              </p>
            )
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity - 1 })}
            className="w-6 h-6 rounded-lg border border-[#E5E0D8] flex items-center justify-center hover:bg-[#F2EDE4] transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity + 1 })}
            className="w-6 h-6 rounded-lg border border-[#E5E0D8] flex items-center justify-center hover:bg-[#F2EDE4] transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
        <span className="text-sm font-bold text-[#1A1A1A]">
          {(item.currentPrice * item.quantity).toLocaleString()} RSD
        </span>
      </div>
    </div>
  )
}

function MealItem({ item, index }) {
  const { dispatch } = useCart()
  const meal = getMealById(item.mealId)
  if (!meal) return null

  return (
    <div className="bg-[#FAFAF8] rounded-xl p-3 border border-[#E5E0D8]">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-sm text-[#1A1A1A]">{meal.name}</p>
          <p className="text-xs text-[#6B7280] mt-0.5">{meal.categoryLabel} · {meal.weight} г</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}
          className="text-[#6B7280] hover:text-red-500 transition-colors p-1"
          aria-label="Удалить"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity - 1 })}
            className="w-6 h-6 rounded-lg border border-[#E5E0D8] flex items-center justify-center hover:bg-[#F2EDE4] transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity + 1 })}
            className="w-6 h-6 rounded-lg border border-[#E5E0D8] flex items-center justify-center hover:bg-[#F2EDE4] transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
        <span className="text-sm font-bold text-[#1A1A1A]">
          {(meal.price * item.quantity).toLocaleString()} RSD
        </span>
      </div>
    </div>
  )
}

export default function CartDrawer({ open, onClose, onOrderOpen }) {
  const { state } = useCart()

  if (!open) return null

  const isEmpty = state.items.length === 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Drawer — desktop: right panel, mobile: bottom sheet */}
      <div className="fixed z-50
        bottom-0 left-0 right-0 h-3/4 rounded-t-2xl
        md:bottom-auto md:top-0 md:left-auto md:right-0 md:h-full md:w-96 md:rounded-none
        bg-white shadow-lg flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-[#2D6A4F]" />
            <h2 className="font-bold text-[#1A1A1A]">Ваш заказ</h2>
            {!isEmpty && (
              <span className="bg-[#2D6A4F] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {state.items.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#F2EDE4] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#F2EDE4] flex items-center justify-center">
                <Package size={36} className="text-[#6B7280]" />
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A] mb-1">Корзина пуста</p>
                <p className="text-sm text-[#6B7280]">Добавьте набор или отдельные блюда</p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#2D6A4F] text-white text-sm font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
              >
                Выбрать набор
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {state.items.map((item, idx) =>
                item.type === 'set' ? (
                  <SetItem key={idx} item={item} index={idx} />
                ) : (
                  <MealItem key={idx} item={item} index={idx} />
                )
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t border-[#E5E0D8] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#1A1A1A]">Итого</span>
              <span className="text-xl font-bold text-[#1A1A1A]">
                {state.total.toLocaleString()} RSD
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mb-4">
              Доставка по Белграду · Оплата после подтверждения заказа
            </p>
            <button
              onClick={() => { onClose(); onOrderOpen() }}
              className="w-full py-3.5 bg-[#2D6A4F] text-white font-bold rounded-xl hover:bg-[#1B4332] transition-colors"
            >
              Оставить заявку
            </button>
          </div>
        )}
      </div>
    </>
  )
}
