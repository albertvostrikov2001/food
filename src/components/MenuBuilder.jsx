import { useState, useMemo } from 'react'
import { ShoppingCart, Info } from 'lucide-react'
import { meals, getMealsByCategory } from '../data/meals'
import { sets } from '../data/sets'
import { getMealById } from '../data/meals'
import MealCard from './MealCard'
import { useCart } from '../context/CartContext'

const SET_TABS = sets.map((s) => ({ id: s.id, label: s.name }))

const CATEGORY_TABS = [
  { id: 'all', label: 'Все' },
  { id: 'breakfast', label: 'Завтраки' },
  { id: 'soup', label: 'Супы' },
  { id: 'lunch', label: 'Обеды' },
  { id: 'dinner', label: 'Ужины' },
  { id: 'salad', label: 'Салаты' },
  { id: 'office', label: 'Для офиса' },
]

function calcSetTotal(setMeals) {
  return setMeals.reduce((sum, m) => {
    const meal = getMealById(m.currentMealId)
    return sum + (meal ? meal.price : 0)
  }, 0)
}

export default function MenuBuilder({ onCartOpen }) {
  const { dispatch, state } = useCart()
  const [activeSetId, setActiveSetId] = useState('set_trial')
  const [categoryTab, setCategoryTab] = useState('all')

  // Local set meals state (for inline replacement)
  const [localMeals, setLocalMeals] = useState(() => {
    const init = {}
    sets.forEach((s) => {
      init[s.id] = s.meals.map((m) => ({ ...m }))
    })
    return init
  })

  const activeSet = sets.find((s) => s.id === activeSetId)
  const activeMeals = localMeals[activeSetId] || []

  const currentTotal = calcSetTotal(activeMeals)
  const basePrice = activeSet ? activeSet.price : 0
  const saving = basePrice > 0 ? basePrice - currentTotal : 0

  function handleReplace(itemIndex, mealIndex, newMealId) {
    setLocalMeals((prev) => {
      const updated = prev[activeSetId].map((m, i) => {
        if (i !== mealIndex) return m
        return {
          ...m,
          currentMealId: newMealId,
          replaced: m.originalMealId !== newMealId,
        }
      })
      return { ...prev, [activeSetId]: updated }
    })
  }

  function handleAddSetToCart() {
    const set = { ...activeSet, meals: activeMeals, price: currentTotal }
    dispatch({ type: 'ADD_SET', set })
    if (onCartOpen) onCartOpen()
  }

  const filteredMeals = useMemo(
    () => getMealsByCategory(categoryTab),
    [categoryTab]
  )

  const replacedCount = activeMeals.filter((m) => m.replaced).length

  return (
    <section id="menu" className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-2">
            Меню и наборы
          </h2>
          <div className="flex items-start gap-2 text-sm text-[#6B7280]">
            <Info size={15} className="mt-0.5 shrink-0 text-[#52B788]" />
            Цены указаны для демо и могут быть уточнены после подтверждения заказа.
          </div>
        </div>

        {/* ── SET BUILDER ── */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm mb-12">
          {/* Set tabs */}
          <div className="border-b border-[#E5E0D8] px-4 pt-4">
            <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-none">
              {SET_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSetId(tab.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 ${
                    activeSetId === tab.id
                      ? 'bg-[#2D6A4F] text-white'
                      : 'text-[#6B7280] hover:bg-[#F2EDE4]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            {activeSet && (
              <div className="mb-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-bold text-lg text-[#1A1A1A]">{activeSet.name}</h3>
                    <p className="text-sm text-[#6B7280] mt-0.5">{activeSet.description}</p>
                  </div>
                  {activeSet.badge && (
                    <span className="px-3 py-1 bg-[#F0FFF4] text-[#2D6A4F] text-xs font-semibold rounded-full border border-[#52B788]">
                      {activeSet.badge}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Meal list */}
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
            <div className="border-t border-[#E5E0D8] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl font-bold text-[#1A1A1A]">
                    {currentTotal.toLocaleString()} RSD
                  </span>
                  {saving > 0 && (
                    <span className="text-sm text-[#2D6A4F] bg-[#F0FFF4] px-2 py-0.5 rounded-full font-semibold">
                      Экономия {saving.toLocaleString()} RSD
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] mt-1">
                  {activeMeals.length} блюд · {activeSet?.days} {activeSet?.days === 1 ? 'день' : activeSet?.days < 5 ? 'дня' : 'дней'}
                  {replacedCount > 0 && ` · ${replacedCount} заменено`}
                </p>
                <p className="text-xs text-[#6B7280]">Оплата после подтверждения заказа</p>
              </div>
              <button
                onClick={handleAddSetToCart}
                className="flex items-center gap-2 px-6 py-3 bg-[#2D6A4F] text-white font-semibold rounded-xl hover:bg-[#1B4332] transition-colors whitespace-nowrap"
              >
                <ShoppingCart size={16} />
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>

        {/* ── INDIVIDUAL MEALS ── */}
        <div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-5">Отдельные блюда</h3>

          {/* Category tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 ${
                  categoryTab === tab.id
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#6B7280] border border-[#E5E0D8] hover:bg-[#F2EDE4]'
                }`}
              >
                {tab.label}
              </button>
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
