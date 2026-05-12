import { Send, Mail, UtensilsCrossed, Instagram } from 'lucide-react'

const navLinks = [
  { label: 'Меню', href: '#menu' },
  { label: 'Наборы', href: '#sets' },
  { label: 'Как работает', href: '#how' },
  { label: 'Для офиса', href: '#b2b' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed size={20} style={{ color: 'var(--color-primary)' }} />
              <span className="font-bold text-lg">
                <span className="text-white">Easy</span>
                <span style={{ color: 'var(--color-primary-muted)' }}> Food</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Готовая охлаждённая еда на неделю в Белграде. Вкусно. Быстро. Всегда под рукой.
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              на производственной базе Easy Freezy
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-4">
              <a href="https://t.me/easyfood_beograd" target="_blank" rel="noopener noreferrer"
                className="transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                <Send size={16} />
              </a>
              <a href="https://instagram.com/easyfood_beograd" target="_blank" rel="noopener noreferrer"
                className="transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Навигация
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Контакты
            </h4>
            <div className="flex flex-col gap-3">
              <a href="https://t.me/easyfood_beograd" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <Send size={14} /> Telegram
              </a>
              <a href="mailto:hello@easyfood.rs"
                className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <Mail size={14} /> hello@easyfood.rs
              </a>
            </div>
            <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Белград, Сербия</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Пн–Пт 9:00–18:00</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
          <span>© 2024 Easy Food. Белград, Сербия. На производственной базе Easy Freezy.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
        <p className="text-xs mt-2 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Демо-версия. Цены носят ознакомительный характер.
        </p>
      </div>
    </footer>
  )
}
