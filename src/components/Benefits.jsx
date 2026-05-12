import {
  Refrigerator, ChefHat, Shuffle, ListChecks, MessageSquareOff, CreditCard,
} from 'lucide-react'
import { benefits } from '../data/benefits'

const iconMap = { Refrigerator, ChefHat, Shuffle, ListChecks, MessageSquareOff, CreditCard }

export default function Benefits() {
  return (
    <section className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">
            Почему Easy Food
          </h2>
          <p className="text-[#9E8E84] max-w-xl mx-auto">
            Привычная еда на каждый день — не доставка ресторана, не диета
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => {
            const Icon = iconMap[b.icon]
            return (
              <div
                key={b.id}
                className="bg-white p-6 transition-shadow hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--color-primary-light)' }}
                >
                  {Icon && <Icon size={22} style={{ color: 'var(--color-primary)' }} />}
                </div>
                <h3 className="font-bold text-[#1C1C1C] mb-2">{b.title}</h3>
                <p className="text-sm text-[#5A4D44] leading-relaxed">{b.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
