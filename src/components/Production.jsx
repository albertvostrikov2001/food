import { CheckCircle, Factory, Shield, Leaf } from 'lucide-react'

const customerValues = [
  'Понятный состав без лишних добавок',
  'Вкусная еда без ощущения столовой',
  'Можно заменить любое блюдо',
  'Не нужно готовить и мыть посуду',
  'Еда всегда есть в холодильнике',
  'Можно начать с пробного набора',
]

function PlaceholderKitchen() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 min-h-[280px]"
      style={{ background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-card)' }}
    >
      <span className="text-6xl">📦</span>
      <span className="text-sm text-[#9E8E84] font-medium">Производство Easy Food</span>
      <span className="text-xs text-[#9E8E84]">На базе Easy Freezy · Белград</span>
    </div>
  )
}

export default function Production() {
  return (
    <section className="py-16" style={{ background: 'var(--color-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-3">Производство и качество</h2>
          <p className="text-[#9E8E84]">Готовим на производственной базе Easy Freezy, контролируем каждый этап</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            {[
              {
                icon: Factory,
                title: 'Собственная производственная база',
                text: '800 м² оснащённого производства на базе Easy Freezy. Готовим небольшими партиями, контролируем состав и качество каждого блюда.',
              },
              {
                icon: Leaf,
                title: 'Почему еда хранится 7–10 дней',
                text: 'Специальная упаковка с модифицированной газовой средой сохраняет свежесть еды без заморозки. Вы получаете готовую еду, которая на вкус — как только приготовленная.',
              },
              {
                icon: Shield,
                title: 'Качество и безопасность',
                text: 'Контроль на каждом этапе — от закупки ингредиентов до упаковки. Аккуратная маркировка: состав, КБЖУ, дата производства и срок хранения на каждом контейнере.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className="flex items-start gap-4 mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-primary-light)' }}
                >
                  <Icon size={22} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-1">{title}</h3>
                  <p className="text-sm text-[#5A4D44] leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-72 lg:h-full">
            <PlaceholderKitchen />
          </div>
        </div>

        {/* Customer values */}
        <div className="rounded-2xl p-8" style={{ background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-card)' }}>
          <h3 className="font-bold text-xl text-[#1C1C1C] mb-6 text-center">Что важно клиентам</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerValues.map((val, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={18} style={{ color: 'var(--color-primary)' }} className="shrink-0 mt-0.5" />
                <span className="text-sm text-[#1C1C1C]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
