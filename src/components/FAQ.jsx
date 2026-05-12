import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../data/faq'

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">Частые вопросы</h2>
          <p className="text-[#9E8E84]">Ответы на всё, что обычно спрашивают</p>
        </div>

        <div className="flex flex-col gap-2">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className="bg-white overflow-hidden transition-all duration-200"
                style={{
                  borderRadius: 'var(--radius-card)',
                  border: isOpen ? '1px solid var(--color-primary-muted)' : '1px solid var(--color-border)',
                  boxShadow: isOpen ? 'var(--shadow-card)' : 'none',
                }}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
                  style={{ background: isOpen ? 'var(--color-primary-light)' : 'transparent' }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'var(--color-primary-light)'; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="font-semibold text-[#1C1C1C] text-sm leading-snug">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--color-primary)' }}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-sm text-[#5A4D44] leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
