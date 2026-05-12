import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Меню', href: '#menu' },
  { label: 'Наборы', href: '#sets' },
  { label: 'Как работает', href: '#how' },
  { label: 'Для офиса', href: '#b2b' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header({ onCartOpen, onOrderOpen }) {
  const { state } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#2D6A4F" />
            <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="16" r="3" fill="white" />
          </svg>
          <span className="font-bold text-xl text-[#2D6A4F] tracking-tight">Porta</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#1A1A1A] hover:text-[#2D6A4F] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-xl hover:bg-[#F2EDE4] transition-colors"
            aria-label="Открыть корзину"
          >
            <ShoppingCart size={22} className="text-[#1A1A1A]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2D6A4F] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOrderOpen}
            className="hidden sm:block px-4 py-2 bg-[#2D6A4F] text-white text-sm font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
          >
            Оставить заявку
          </button>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[#F2EDE4] transition-colors"
            aria-label="Меню"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E5E0D8] bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 px-3 text-sm font-medium text-[#1A1A1A] hover:text-[#2D6A4F] hover:bg-[#F2EDE4] rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onOrderOpen() }}
              className="mt-2 w-full px-4 py-2.5 bg-[#2D6A4F] text-white text-sm font-semibold rounded-xl hover:bg-[#1B4332] transition-colors"
            >
              Оставить заявку
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
