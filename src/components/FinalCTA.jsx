import { Send, ChevronRight } from 'lucide-react'

export default function FinalCTA({ onOrderOpen }) {
  return (
    <section className="py-20 bg-[#1B4332]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Готовы попробовать?
        </h2>
        <p className="text-[#95D5B2] text-lg mb-10">
          Начните с пробного набора на 3 дня — без подписки и обязательств.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#1B4332] font-bold rounded-xl hover:bg-[#F0FFF4] transition-colors"
          >
            Собрать набор
            <ChevronRight size={16} />
          </a>
          <a
            href="https://t.me/porta_food"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
          >
            <Send size={16} />
            Написать в Telegram
          </a>
        </div>

        <p className="text-[#52B788] text-sm mt-8">
          Оплата после подтверждения заказа · Доставка по Белграду
        </p>
      </div>
    </section>
  )
}
