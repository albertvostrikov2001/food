import { useState } from 'react'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getMealById } from '../data/meals'

const STORAGE_KEY = 'easyfood_last_order'

function OrderSummary({ items, total }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--color-beige)' }}>
      <h3 className="font-bold text-[#1C1C1C] mb-4 text-sm">Ваш заказ</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => {
          if (item.type === 'set') {
            return (
              <div key={i} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#1C1C1C]">{item.setName}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{item.meals.length} блюд × {item.quantity}</p>
                </div>
                <span className="text-sm font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>
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
                <p className="text-sm font-semibold text-[#1C1C1C]">{meal.name}</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>× {item.quantity}</p>
              </div>
              <span className="text-sm font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>
                {(meal.price * item.quantity).toLocaleString()} RSD
              </span>
            </div>
          )
        })}
      </div>
      <div className="border-t mt-4 pt-4 flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
        <span className="font-bold text-[#1C1C1C]">Итого</span>
        <span className="text-lg font-extrabold" style={{ color: 'var(--color-primary)' }}>{total.toLocaleString()} RSD</span>
      </div>
      <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>Оплата после подтверждения заказа</p>
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
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone.trim())) e.phone = 'Введите корректный номер'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    const order = { ...form, items: state.items, total: state.total, isB2B, createdAt: new Date().toISOString() }
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

  const inputBase = {
    width: '100%', padding: '12px 16px', borderRadius: '12px',
    border: '1px solid var(--color-border)', fontSize: '14px', outline: 'none',
    transition: 'border 150ms, box-shadow 150ms',
  }
  const inputFocus = (e) => {
    e.currentTarget.style.border = '1px solid var(--color-primary)'
    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)'
  }
  const inputBlur = (e, hasError) => {
    e.currentTarget.style.border = hasError
      ? '1px solid var(--color-primary)'
      : '1px solid var(--color-border)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[60]"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={handleClose}
      />
      {/* Modal: fullscreen on mobile, centered on desktop */}
      <div
        className="fixed z-[60] bg-white overflow-y-auto
          inset-0
          md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2
          md:w-full md:max-w-2xl md:max-h-[90vh] md:rounded-3xl"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center p-12 gap-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-primary-light)', border: '2px solid var(--color-primary-muted)' }}
              >
                <CheckCircle size={40} style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Заявка отправлена!</h2>
                <p className="text-[#5A4D44] max-w-sm">
                  Спасибо! Команда Easy Food свяжется с вами для подтверждения заказа.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 font-semibold transition-colors"
                style={{ border: '2px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h2 className="font-bold text-xl text-[#1C1C1C]">
                  {isB2B ? 'Заявка для офиса' : 'Оставить заявку'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-xl transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
                >
                  <X size={18} />
                </button>
              </div>

              <div className={`grid ${state.items.length > 0 ? 'md:grid-cols-2' : ''}`}>
                {state.items.length > 0 && (
                  <div className="p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--color-border)' }}>
                    <OrderSummary items={state.items} total={state.total} />
                  </div>
                )}

                <div className={`p-6 ${state.items.length === 0 ? 'md:col-span-2' : ''}`}>
                  {isB2B && (
                    <div className="rounded-xl px-4 py-3 mb-5 text-sm" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-muted)' }}>
                      Заявка для офисного питания. Менеджер свяжется для расчёта.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        Имя <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        type="text" placeholder="Ваше имя" value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onFocus={inputFocus} onBlur={(e) => inputBlur(e, !!errors.name)}
                        style={{ ...inputBase, borderColor: errors.name ? 'var(--color-primary)' : 'var(--color-border)' }}
                      />
                      {errors.name && (
                        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                        Телефон <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        type="tel" placeholder="+381 или +7..." value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onFocus={inputFocus} onBlur={(e) => inputBlur(e, !!errors.phone)}
                        style={{ ...inputBase, borderColor: errors.phone ? 'var(--color-primary)' : 'var(--color-border)' }}
                      />
                      {errors.phone && (
                        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Город</label>
                      <input
                        type="text" value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        onFocus={inputFocus} onBlur={(e) => inputBlur(e, false)}
                        style={inputBase}
                      />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Комментарий</label>
                      <textarea
                        rows={3}
                        placeholder="Аллергии, предпочтения, адрес, удобное время..."
                        value={form.comment}
                        onChange={(e) => handleChange('comment', e.target.value)}
                        onFocus={inputFocus} onBlur={(e) => inputBlur(e, false)}
                        style={{ ...inputBase, resize: 'none' }}
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        type="submit"
                        className="w-full py-3.5 text-white font-bold transition-colors"
                        style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-btn)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
                      >
                        Отправить заявку
                      </button>
                      <a
                        href="https://t.me/easyfood_beograd"
                        target="_blank" rel="noopener noreferrer"
                        className="w-full py-3 font-semibold flex items-center justify-center gap-2 text-sm text-white transition-colors"
                        style={{ background: '#229ED9', borderRadius: 'var(--radius-btn)' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1a8ac4'}
                        onMouseLeave={e => e.currentTarget.style.background = '#229ED9'}
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
      </div>
    </>
  )
}
