import {
  Refrigerator,
  ChefHat,
  Shuffle,
  ListChecks,
  MessageSquareOff,
  CreditCard,
} from 'lucide-react'
import { benefits } from '../data/benefits'

const iconMap = {
  Refrigerator,
  ChefHat,
  Shuffle,
  ListChecks,
  MessageSquareOff,
  CreditCard,
}

export default function Benefits() {
  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
            Почему Porta
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">
            Не доставка ресторана, не диета — умный холодильник с вкусной едой на несколько дней
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => {
            const Icon = iconMap[b.icon]
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F0FFF4] flex items-center justify-center mb-4">
                  {Icon && <Icon size={22} className="text-[#2D6A4F]" />}
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">{b.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{b.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
