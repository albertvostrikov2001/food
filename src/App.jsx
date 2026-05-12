import { useState } from 'react'
import { ShoppingCart, FileText } from 'lucide-react'
import { CartProvider, useCart } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedMeals from './components/FeaturedMeals'
import MenuBuilder from './components/MenuBuilder'
import Pricing from './components/Pricing'
import Benefits from './components/Benefits'
import Audience from './components/Audience'
import HowItWorks from './components/HowItWorks'
import B2BSection from './components/B2BSection'
import FridgeBlock from './components/FridgeBlock'
import Gallery from './components/Gallery'
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
    <div className="min-h-screen font-sans" style={{ background: 'var(--color-bg)' }}>
      <Header
        onCartOpen={() => setCartOpen(true)}
        onOrderOpen={() => openOrder(false)}
      />

      <main>
        {/* 1. Hero */}
        <Hero onOrderOpen={() => openOrder(false)} />

        {/* 2. Самые аппетитные блюда недели */}
        <FeaturedMeals />

        {/* 3. Пробный набор + меню */}
        <div id="menu">
          <MenuBuilder onCartOpen={() => setCartOpen(true)} />
        </div>

        {/* 4. Все наборы */}
        <Pricing onCartOpen={() => setCartOpen(true)} />

        {/* 5. Почему удобнее / преимущества */}
        <Benefits />
        <Audience />

        {/* 6. Как работает */}
        <HowItWorks />

        {/* 7. B2B */}
        <B2BSection onOrderOpen={openOrder} />

        {/* 8. Еда в холодильнике */}
        <FridgeBlock onOrder={() => openOrder(false)} />

        {/* 9. Галерея */}
        <Gallery />

        {/* 10. Производство */}
        <Production />

        {/* 11. FAQ */}
        <FAQ />

        {/* 12. Финальная форма */}
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
            Хочу попробовать
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
