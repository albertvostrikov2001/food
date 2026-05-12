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
    <section className="py-16" style={{ background: 'var(--color-surface-warm)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-4">
            Для кого подходит Easy Food
          </h2>
          <p className="text-[#9E8E84] mb-10">
            Меньше ежедневных решений про еду — для всех, кому некогда или не хочется готовить
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tags.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full"
                style={{
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-primary-muted)',
                }}
              >
                <span>{t.emoji}</span>
                {t.label}
              </span>
            ))}
          </div>

          <p className="text-sm text-[#9E8E84] bg-white rounded-2xl px-6 py-4 inline-block" style={{ border: '1px solid var(--color-border)' }}>
            Сайт на русском — сервис для всех жителей Белграда
          </p>
        </div>
      </div>
    </section>
  )
}
