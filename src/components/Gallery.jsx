const images = [
  { src: '/food/images/gallery-1.jpg', alt: 'Контейнеры с готовой едой — пример', span: 'col-span-1 row-span-2' },
  { src: '/food/images/gallery-2.jpg', alt: 'Набор на несколько дней — пример', span: 'col-span-1' },
  { src: '/food/images/gallery-3.jpg', alt: 'Разнообразие блюд на столе — пример', span: 'col-span-1' },
  { src: '/food/images/gallery-4.jpg', alt: 'Аппетитная тарелка — пример', span: 'col-span-1 row-span-2' },
  { src: '/food/images/gallery-5.jpg', alt: 'Горячий суп — пример', span: 'col-span-1' },
  { src: '/food/images/gallery-6.jpg', alt: 'Свежий боул с овощами — пример', span: 'col-span-1' },
]

export default function Gallery() {
  return (
    <section className="py-16" style={{ background: 'var(--color-beige)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1C1C1C] tracking-tight mb-2">
            Как выглядит готовая еда
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Пример блюд — демо-контент. Так может выглядеть ваш набор от Easy Food.
          </p>
        </div>

        {/* Desktop masonry grid */}
        <div className="hidden sm:grid grid-cols-3 grid-rows-3 gap-3 h-[520px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden ${img.span}`}
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sm:hidden flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-none w-64 h-48 overflow-hidden snap-center"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
          Фото — демо-контент из открытых источников. Перед коммерческим запуском будет заменено на собственные фотографии.
        </p>
      </div>
    </section>
  )
}
