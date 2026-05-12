import { X, ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getMealById } from '../data/meals'

function SetItem({ item, index }) {
  const { dispatch } = useCart()
  const replacedMeals = item.meals.filter((m) => m.replaced)

  return (
    <div className="rounded-xl p-3" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-sm text-[#1C1C1C]">{item.setName}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
            {item.meals.length} блюд{replacedMeals.length > 0 && ` · ${replacedMeals.length} заменено`}
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}
          className="p-1 transition-colors"
          style={{ color: 'var(--color-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
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
              <p key={i} className="text-xs" style={{ color: 'var(--color-muted)' }}>
                <span className="line-through">{orig?.name}</span>
                {' → '}
                <span style={{ color: 'var(--color-primary)' }}>{curr?.name}</span>
              </p>
            )
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity - 1 })}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'inherit'; }}
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity + 1 })}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'inherit'; }}
          >
            <Plus size={12} />
          </button>
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
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
    <div className="rounded-xl p-3" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-semibold text-sm text-[#1C1C1C]">{meal.name}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{meal.categoryLabel} · {meal.weight} г</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}
          className="p-1 transition-colors"
          style={{ color: 'var(--color-muted)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity - 1 })}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'inherit'; }}
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', index, quantity: item.quantity + 1 })}
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
            style={{ border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'inherit'; }}
          >
            <Plus size={12} />
          </button>
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
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
      <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose} />

      {/* Drawer: bottom sheet on mobile, right panel on desktop */}
      <div
        className="fixed z-50 bg-white flex flex-col
          bottom-0 left-0 right-0 h-3/4 rounded-t-[20px]
          md:bottom-auto md:top-0 md:left-auto md:right-0 md:h-full md:w-96 md:rounded-none"
        style={{ boxShadow: 'var(--shadow-drawer)' }}
      >
        {/* Drag handle (mobile) */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} style={{ color: 'var(--color-primary)' }} />
            <h2 className="font-bold text-[#1C1C1C]">Ваш заказ</h2>
            {!isEmpty && (
              <span className="text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-primary)' }}>
                {state.items.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-beige)' }}>
                <Package size={36} style={{ color: 'var(--color-muted)' }} />
              </div>
              <div>
                <p className="font-semibold text-[#1C1C1C] mb-1">Корзина пуста</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Добавьте набор или отдельные блюда</p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-white text-sm font-semibold transition-colors"
                style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                Выбрать набор
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {state.items.map((item, idx) =>
                item.type === 'set'
                  ? <SetItem key={idx} item={item} index={idx} />
                  : <MealItem key={idx} item={item} index={idx} />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t p-5" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#1C1C1C]">Итого</span>
              <span className="text-xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
                {state.total.toLocaleString()} RSD
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
              Доставка по Белграду · Оплата после подтверждения заказа
            </p>
            <button
              onClick={() => { onClose(); onOrderOpen() }}
              className="w-full py-3.5 text-white font-bold transition-colors"
              style={{
                background: 'var(--color-primary)',
                borderRadius: 'var(--radius-btn)',
                boxShadow: '0 4px 14px rgba(208,57,94,0.25)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
            >
              Оставить заявку
            </button>
          </div>
        )}
      </div>
    </>
  )
}
