import { createContext, useContext, useReducer, useEffect } from 'react'
import { getMealById } from '../data/meals'

const CartContext = createContext(null)

const STORAGE_KEY = 'porta_cart'

function calcSetPrice(item) {
  let price = item.basePrice
  item.meals.forEach((m) => {
    if (m.replaced) {
      const orig = getMealById(m.originalMealId)
      const curr = getMealById(m.currentMealId)
      if (orig && curr) {
        price += curr.price - orig.price
      }
    }
  })
  return price
}

function calcTotal(items) {
  return items.reduce((sum, item) => {
    if (item.type === 'set') {
      return sum + item.currentPrice * item.quantity
    }
    const meal = getMealById(item.mealId)
    return sum + (meal ? meal.price * item.quantity : 0)
  }, 0)
}

function cartReducer(state, action) {
  let newItems
  switch (action.type) {
    case 'ADD_SET': {
      const existing = state.items.find(
        (i) => i.type === 'set' && i.setId === action.set.id
      )
      if (existing) {
        newItems = state.items.map((i) =>
          i.type === 'set' && i.setId === action.set.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      } else {
        const newItem = {
          type: 'set',
          setId: action.set.id,
          setName: action.set.name,
          meals: action.set.meals.map((m) => ({ ...m })),
          quantity: 1,
          basePrice: action.set.price,
          currentPrice: action.set.price,
        }
        newItems = [...state.items, newItem]
      }
      break
    }
    case 'ADD_MEAL': {
      const existing = state.items.find(
        (i) => i.type === 'meal' && i.mealId === action.mealId
      )
      if (existing) {
        newItems = state.items.map((i) =>
          i.type === 'meal' && i.mealId === action.mealId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      } else {
        newItems = [
          ...state.items,
          { type: 'meal', mealId: action.mealId, quantity: 1 },
        ]
      }
      break
    }
    case 'REMOVE_ITEM':
      newItems = state.items.filter((_, idx) => idx !== action.index)
      break
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        newItems = state.items.filter((_, idx) => idx !== action.index)
      } else {
        newItems = state.items.map((item, idx) =>
          idx === action.index ? { ...item, quantity: action.quantity } : item
        )
      }
      break
    case 'REPLACE_MEAL_IN_SET': {
      newItems = state.items.map((item, idx) => {
        if (idx !== action.itemIndex) return item
        const updatedMeals = item.meals.map((m, mIdx) => {
          if (mIdx !== action.mealIndex) return m
          return {
            ...m,
            currentMealId: action.newMealId,
            replaced: m.originalMealId !== action.newMealId,
          }
        })
        const updatedItem = { ...item, meals: updatedMeals }
        updatedItem.currentPrice = calcSetPrice(updatedItem)
        return updatedItem
      })
      break
    }
    case 'CLEAR_CART':
      newItems = []
      break
    default:
      return state
  }
  const total = calcTotal(newItems)
  return { items: newItems, total }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { items: parsed, total: calcTotal(parsed) }
    }
  } catch {
    // ignore
  }
  return { items: [], total: 0 }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
