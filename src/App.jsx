import { useState } from 'react'
import { ShoppingCart, FileText } from 'lucide-react'
import { CartProvider, useCart } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Audience from './components/Audience'
import MenuBuilder from './components/MenuBuilder'
import HowItWorks from './components/HowItWorks'
import B2BSection from './components/B2BSection'
import Pricing from './components/Pricing'
import Production from './components/Production'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import OrderModal from './components/OrderModal'

function AppContent() {
  const { state } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [isB2B, setIsB2B] = useState(false)

  function openOrder(b2b = false) {
    setIsB2B(!!b2b)
    setOrderOpen(true)
  }

  const cartCount = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">
      <Header
        onCartOpen={() => setCartOpen(true)}
        onOrderOpen={() => openOrder(false)}
      />

      <main>
        <Hero onOrderOpen={() => openOrder(false)} />
        <Benefits />
        <Audience />
        <MenuBuilder onCartOpen={() => setCartOpen(true)} />
        <HowItWorks />
        <Pricing onCartOpen={() => setCartOpen(true)} />
        <B2BSection onOrderOpen={openOrder} />
        <Production />
        <FAQ />
        <FinalCTA onOrderOpen={() => openOrder(false)} />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onOrderOpen={() => openOrder(false)}
      />

      <OrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        isB2B={isB2B}
      />

      {/* Mobile sticky bottom bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white px-4 py-3 flex items-center gap-3 shadow-lg" style={{ borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={() => setCartOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 font-semibold rounded-xl text-sm transition-colors"
            style={{ border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
          >
            <ShoppingCart size={16} />
            Корзина ({cartCount})
          </button>
          <button
            onClick={() => openOrder(false)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl text-sm transition-colors"
            style={{ background: 'var(--color-primary)' }}
          >
            <FileText size={16} />
            Оставить заявку
          </button>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
