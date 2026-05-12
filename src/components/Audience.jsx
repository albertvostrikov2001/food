const tags = [
  { label: 'Удалёнщики', emoji: '💻' },
  { label: 'Занятые специалисты', emoji: '📱' },
  { label: 'Пары', emoji: '👫' },
  { label: 'Экспаты и релоканты', emoji: '✈️' },
  { label: 'Те, кто не хочет готовить', emoji: '🙅' },
  { label: 'Небольшие офисы', emoji: '🏢' },
  { label: 'Предприниматели', emoji: '🚀' },
]

export default function Audience() {
  return (
    <section className="py-16 bg-[#F2EDE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-4">
            Для кого подходит Porta
          </h2>
          <p className="text-[#6B7280] mb-10">
            Для всех, кому некогда или просто не хочется думать о еде каждый день
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tags.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] text-sm font-medium px-4 py-2.5 rounded-2xl border border-[#E5E0D8] shadow-sm"
              >
                <span>{t.emoji}</span>
                {t.label}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#6B7280] bg-white rounded-2xl px-6 py-4 border border-[#E5E0D8] inline-block">
            Сайт на русском — сервис для всех жителей Белграда
          </p>
        </div>
      </div>
    </section>
  )
}
