import { useState } from 'react'
import { ShoppingCart, Menu, X, UtensilsCrossed } from 'lucide-react'
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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#EDE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <UtensilsCrossed size={22} className="text-[#D0395E]" />
          <span className="font-bold text-xl tracking-tight">
            <span className="text-[#1C1C1C]">Easy</span>
            <span className="text-[#D0395E]"> Food</span>
          </span>
        </a>

        {/* Phone stub (desktop) */}
        <span className="hidden lg:block text-xs text-[#9E8E84]">+381 XX XXX XXXX</span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#5A4D44] hover:text-[#D0395E] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-xl hover:bg-[#FCE8ED] transition-colors"
            aria-label="Открыть корзину"
          >
            <ShoppingCart size={20} className="text-[#1C1C1C]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D0395E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOrderOpen}
            className="hidden sm:block px-4 py-2 bg-[#D0395E] text-white text-sm font-semibold rounded-xl hover:bg-[#B02E4F] transition-colors"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            Оставить заявку
          </button>

          {/* Burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[#FCE8ED] transition-colors"
            aria-label="Меню"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#EDE5DC] bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 text-sm font-medium text-[#1C1C1C] hover:text-[#D0395E] hover:bg-[#FCE8ED] rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onOrderOpen() }}
              className="mt-2 w-full px-4 py-3 bg-[#D0395E] text-white text-sm font-semibold rounded-xl hover:bg-[#B02E4F] transition-colors"
            >
              Оставить заявку
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
