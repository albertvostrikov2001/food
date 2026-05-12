import { sets } from '../data/sets'
import SetCard from './SetCard'

export default function Pricing({ onCartOpen }) {
  return (
    <section id="sets" className="py-16" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">Наборы</h2>
          <p className="text-[#9E8E84] max-w-lg mx-auto">
            Без обязательной подписки — сначала попробуйте.{' '}
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>Цены указаны для демо.</span>
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
          {sets.map((set) => (
            <SetCard key={set.id} set={set} onOrder={onCartOpen} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {sets.map((set) => (
              <div key={set.id} className="snap-start shrink-0 w-72">
                <SetCard set={set} onOrder={onCartOpen} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
