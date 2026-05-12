import { useState } from 'react'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getMealById } from '../data/meals'

const STORAGE_KEY = 'porta_last_order'

function OrderSummary({ items, total }) {
  return (
    <div className="bg-[#F2EDE4] rounded-2xl p-5">
      <h3 className="font-bold text-[#1A1A1A] mb-4 text-sm">Ваш заказ</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          if (item.type === 'set') {
            return (
              <div key={i} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{item.setName}</p>
                  <p className="text-xs text-[#6B7280]">{item.meals.length} блюд × {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-[#1A1A1A] shrink-0">
                  {(item.currentPrice * item.quantity).toLocaleString()} RSD
                </span>
              </div>
            )
          }
          const meal = getMealById(item.mealId)
          if (!meal) return null
          return (
            <div key={i} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{meal.name}</p>
                <p className="text-xs text-[#6B7280]">× {item.quantity}</p>
              </div>
              <span className="text-sm font-bold text-[#1A1A1A] shrink-0">
                {(meal.price * item.quantity).toLocaleString()} RSD
              </span>
            </div>
          )
        })}
      </div>
      <div className="border-t border-[#E5E0D8] mt-4 pt-4 flex justify-between items-center">
        <span className="font-bold text-[#1A1A1A]">Итого</span>
        <span className="text-lg font-bold text-[#1A1A1A]">{total.toLocaleString()} RSD</span>
      </div>
      <p className="text-xs text-[#6B7280] mt-2">Оплата после подтверждения заказа</p>
    </div>
  )
}

export default function OrderModal({ open, onClose, isB2B = false }) {
  const { state, dispatch } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', city: 'Белград', comment: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Введите имя'
    if (!form.phone.trim()) e.phone = 'Введите телефон'
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone.trim())) {
      e.phone = 'Введите корректный номер'
    }
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const order = {
      ...form,
      items: state.items,
      total: state.total,
      isB2B,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    dispatch({ type: 'CLEAR_CART' })
    setSubmitted(true)
  }

  function handleClose() {
    setSubmitted(false)
    setForm({ name: '', phone: '', city: 'Белград', comment: '' })
    setErrors({})
    onClose()
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={handleClose}
      />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[60] max-w-3xl mx-auto max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Success screen */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center p-12 gap-6">
            <div className="w-20 h-20 rounded-full bg-[#F0FFF4] border-2 border-[#52B788] flex items-center justify-center">
              <CheckCircle size={40} className="text-[#2D6A4F]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Заявка отправлена!</h2>
              <p className="text-[#6B7280] max-w-sm">
                Спасибо! Мы свяжемся с вами для подтверждения заказа в ближайшее время.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#2D6A4F] text-white font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8]">
              <h2 className="font-bold text-xl text-[#1A1A1A]">
                {isB2B ? 'Заявка для офиса' : 'Оставить заявку'}
              </h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-xl hover:bg-[#F2EDE4] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-0 md:gap-0">
              {/* Left — order summary */}
              {state.items.length > 0 && (
                <div className="p-6 border-b md:border-b-0 md:border-r border-[#E5E0D8]">
                  <OrderSummary items={state.items} total={state.total} />
                </div>
              )}

              {/* Right — form */}
              <div className={`p-6 ${state.items.length === 0 ? 'md:col-span-2' : ''}`}>
                {isB2B && (
                  <div className="bg-[#F0FFF4] border border-[#52B788] rounded-xl px-4 py-3 mb-5 text-sm text-[#2D6A4F]">
                    Заявка для офисного питания. Менеджер свяжется для расчёта.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                        errors.name
                          ? 'border-red-400 bg-red-50'
                          : 'border-[#E5E0D8] focus:border-[#2D6A4F]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+381 или +7..."
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-400 bg-red-50'
                          : 'border-[#E5E0D8] focus:border-[#2D6A4F]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Город
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] focus:border-[#2D6A4F] text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                      Комментарий
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Аллергии, предпочтения, адрес, удобное время..."
                      value={form.comment}
                      onChange={(e) => handleChange('comment', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] focus:border-[#2D6A4F] text-sm outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit + Telegram */}
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#2D6A4F] text-white font-bold rounded-xl hover:bg-[#1B4332] transition-colors"
                    >
                      Отправить заявку
                    </button>
                    <a
                      href="https://t.me/porta_food"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 border border-[#2D6A4F] text-[#2D6A4F] font-semibold rounded-xl hover:bg-[#F0FFF4] transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Send size={14} />
                      Написать в Telegram
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
