import { useState, useMemo } from 'react'
import { ShoppingCart, Info } from 'lucide-react'
import { meals, getMealsByCategory, getMealById } from '../data/meals'
import { sets } from '../data/sets'
import MealCard from './MealCard'
import { useCart } from '../context/CartContext'

const SET_TABS = sets.map((s) => ({ id: s.id, label: s.name }))

const CATEGORY_TABS = [
  { id: 'all',       label: 'Все' },
  { id: 'breakfast', label: 'Завтраки' },
  { id: 'soup',      label: 'Супы' },
  { id: 'lunch',     label: 'Обеды' },
  { id: 'dinner',    label: 'Ужины' },
  { id: 'salad',     label: 'Салаты' },
  { id: 'office',    label: 'Для офиса' },
]

function calcSetTotal(setMeals) {
  return setMeals.reduce((sum, m) => {
    const meal = getMealById(m.currentMealId)
    return sum + (meal ? meal.price : 0)
  }, 0)
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors shrink-0"
      style={{
        borderRadius: '999px',
        background: active ? 'var(--color-primary)' : 'var(--color-beige)',
        color: active ? 'white' : 'var(--color-text-secondary)',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.color = 'var(--color-primary)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'var(--color-beige)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; } }}
    >
      {children}
    </button>
  )
}

export default function MenuBuilder({ onCartOpen }) {
  const { dispatch } = useCart()
  const [activeSetId, setActiveSetId] = useState('set_trial')
  const [categoryTab, setCategoryTab] = useState('all')

  const [localMeals, setLocalMeals] = useState(() => {
    const init = {}
    sets.forEach((s) => { init[s.id] = s.meals.map((m) => ({ ...m })) })
    return init
  })

  const activeSet = sets.find((s) => s.id === activeSetId)
  const activeMeals = localMeals[activeSetId] || []
  const currentTotal = calcSetTotal(activeMeals)
  const basePrice = activeSet ? activeSet.price : 0
  const saving = basePrice > 0 ? basePrice - currentTotal : 0
  const replacedCount = activeMeals.filter((m) => m.replaced).length

  function handleReplace(itemIndex, mealIndex, newMealId) {
    setLocalMeals((prev) => {
      const updated = prev[activeSetId].map((m, i) => {
        if (i !== mealIndex) return m
        return { ...m, currentMealId: newMealId, replaced: m.originalMealId !== newMealId }
      })
      return { ...prev, [activeSetId]: updated }
    })
  }

  function handleAddSetToCart() {
    const set = { ...activeSet, meals: activeMeals, price: currentTotal }
    dispatch({ type: 'ADD_SET', set })
    if (onCartOpen) onCartOpen()
  }

  const filteredMeals = useMemo(() => getMealsByCategory(categoryTab), [categoryTab])

  return (
    <section id="menu" className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-2">Меню и наборы</h2>
          <div className="flex items-start gap-2 text-sm text-[#9E8E84]">
            <Info size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
            Цены указаны для демо и могут быть уточнены после подтверждения заказа.
          </div>
        </div>

        {/* ── SET BUILDER ── */}
        <div className="bg-white mb-12" style={{ borderRadius: 'var(--radius-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          {/* Set tabs */}
          <div className="border-b px-4 pt-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              {SET_TABS.map((tab) => (
                <TabButton key={tab.id} active={activeSetId === tab.id} onClick={() => setActiveSetId(tab.id)}>
                  {tab.label}
                </TabButton>
              ))}
            </div>
          </div>

          <div className="p-5">
            {activeSet && (
              <div className="mb-5 flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-bold text-lg text-[#1C1C1C]">{activeSet.name}</h3>
                  <p className="text-sm text-[#5A4D44] mt-0.5">{activeSet.description}</p>
                </div>
                {activeSet.badge && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-muted)' }}>
                    {activeSet.badge}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2 mb-5">
              {activeMeals.map((m, mIdx) => {
                const meal = getMealById(m.currentMealId)
                if (!meal) return null
                return (
                  <MealCard
                    key={mIdx}
                    meal={meal}
                    mode="set"
                    mealIndex={mIdx}
                    itemIndex={0}
                    replaced={m.replaced}
                    originalMealId={m.replaced ? m.originalMealId : null}
                    onReplace={handleReplace}
                  />
                )
              })}
            </div>

            {/* Summary */}
            <div className="border-t pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
                    {currentTotal.toLocaleString()} RSD
                  </span>
                  {saving > 0 && (
                    <span className="text-sm font-semibold px-2 py-0.5 rounded-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)', borderRadius: 'var(--radius-badge)' }}>
                      Экономия {saving.toLocaleString()} RSD
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#9E8E84] mt-1">
                  {activeMeals.length} блюд · {activeSet?.days} {activeSet?.days === 1 ? 'день' : activeSet?.days < 5 ? 'дня' : 'дней'}
                  {replacedCount > 0 && ` · ${replacedCount} заменено`}
                </p>
                <p className="text-xs text-[#9E8E84]">Оплата после подтверждения заказа</p>
              </div>
              <button
                onClick={handleAddSetToCart}
                className="flex items-center gap-2 px-6 py-3 text-white font-semibold whitespace-nowrap transition-colors"
                style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                <ShoppingCart size={16} />
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>

        {/* ── INDIVIDUAL MEALS ── */}
        <div>
          <h3 className="text-xl font-bold text-[#1C1C1C] mb-5">Отдельные блюда</h3>

          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            {CATEGORY_TABS.map((tab) => (
              <TabButton key={tab.id} active={categoryTab === tab.id} onClick={() => setCategoryTab(tab.id)}>
                {tab.label}
              </TabButton>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} mode="full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
