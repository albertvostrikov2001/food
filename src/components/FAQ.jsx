import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../data/faq'

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="py-16 bg-[#FAFAF8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
            Частые вопросы
          </h2>
          <p className="text-[#6B7280]">Ответы на всё, что обычно спрашивают</p>
        </div>

        <div className="flex flex-col gap-2">
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-[#52B788] shadow-sm' : 'border-[#E5E0D8]'
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#1A1A1A] text-sm leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#2D6A4F] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 border-t border-[#E5E0D8] pt-3">
                    <p className="text-sm text-[#6B7280] leading-relaxed">{item.a}</p>
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
