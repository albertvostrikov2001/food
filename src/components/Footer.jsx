import { Send, Mail } from 'lucide-react'

const navLinks = [
  { label: 'Меню', href: '#menu' },
  { label: 'Наборы', href: '#sets' },
  { label: 'Как работает', href: '#how' },
  { label: 'Для офиса', href: '#b2b' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#2D6A4F" />
                <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="16" r="3" fill="white" />
              </svg>
              <span className="font-bold text-lg text-white">Porta</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Готовая еда на неделю в Белграде. Умный холодильник — не доставка ресторана.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Навигация
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Контакты
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://t.me/porta_food"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Send size={14} />
                Telegram
              </a>
              <a
                href="mailto:hello@porta.food"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={14} />
                hello@porta.food
              </a>
            </div>
            <p className="text-xs text-gray-600 mt-4">Белград, Сербия</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© 2024 Porta. Белград, Сербия.</span>
          <span className="text-center">
            Демо-версия. Цены и данные носят ознакомительный характер.
          </span>
        </div>
      </div>
    </footer>
  )
}
