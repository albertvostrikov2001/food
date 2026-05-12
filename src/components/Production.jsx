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
    <div className="w-full h-full bg-[#E8F5E9] flex flex-col items-center justify-center rounded-2xl gap-3 min-h-[280px]">
      <span className="text-6xl">🏭</span>
      <span className="text-sm text-[#6B7280] font-medium">Производство Porta</span>
      <span className="text-xs text-[#6B7280]">Собственная база · Белград</span>
    </div>
  )
}

export default function Production() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
            Производство и качество
          </h2>
          <p className="text-[#6B7280]">Готовим на собственной базе, контролируем каждый этап</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#F0FFF4] flex items-center justify-center shrink-0">
                <Factory size={22} className="text-[#2D6A4F]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Собственная производственная база</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  800 м² оснащённого производства. Готовим небольшими партиями, контролируем состав и качество каждого блюда.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#F0FFF4] flex items-center justify-center shrink-0">
                <Leaf size={22} className="text-[#2D6A4F]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Почему еда хранится 7–10 дней</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Специальная упаковка с модифицированной газовой средой сохраняет свежесть еды без заморозки и без консервантов.
                  Вы получаете готовую еду, которая на вкус — как только приготовленная.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#F0FFF4] flex items-center justify-center shrink-0">
                <Shield size={22} className="text-[#2D6A4F]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Качество и безопасность</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Контроль на каждом этапе — от закупки ингредиентов до упаковки. Аккуратная маркировка: состав, КБЖУ,
                  дата производства и срок хранения на каждом контейнере.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="h-72 lg:h-full">
            <PlaceholderKitchen />
          </div>
        </div>

        {/* Customer values */}
        <div className="bg-[#F2EDE4] rounded-2xl p-8">
          <h3 className="font-bold text-xl text-[#1A1A1A] mb-6 text-center">
            Что важно клиентам
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerValues.map((val, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-[#2D6A4F] shrink-0 mt-0.5" />
                <span className="text-sm text-[#1A1A1A]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
