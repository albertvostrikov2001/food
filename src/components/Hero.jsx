import { MapPin, Clock, Gift, Unlock, ChevronRight } from 'lucide-react'

const badges = [
  { icon: MapPin, text: 'Белград' },
  { icon: Clock, text: '3–7 мин на разогрев' },
  { icon: Gift, text: 'Пробный набор' },
  { icon: Unlock, text: 'Без подписки' },
]

const tickerItems = [
  'Вкусно. Быстро. Всегда под рукой',
  'Хранение 7–10 дней',
  'Разогрев за 3–7 минут',
  'Без подписки',
  'Доставка по Белграду',
  'Замена любого блюда',
  'Оплата после подтверждения',
]

const sidePhotos = [
  { src: '/food/images/hero-side-1.jpg', alt: 'Свежий салат боул — пример блюда', label: 'Обед' },
  { src: '/food/images/hero-side-2.jpg', alt: 'Зерновой боул с овощами — пример блюда', label: 'Ужин' },
  { src: '/food/images/hero-side-3.jpg', alt: 'Тёплый суп — пример блюда', label: 'Завтрак' },
]

export default function Hero({ onOrderOpen }) {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image with overlay */}
      <div className="relative min-h-[90vh] md:min-h-[85vh] flex flex-col">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/food/images/hero-main.jpg"
            alt="Аппетитный набор готовых блюд — пример меню Easy Food"
            fetchpriority="high"
            className="w-full h-full object-cover"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(28,10,5,0.72) 0%, rgba(28,10,5,0.42) 55%, rgba(0,0,0,0.15) 100%)' }} />
          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, rgba(255,248,243,1) 0%, rgba(255,248,243,0) 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-20 pb-12">
          <div className="grid lg:grid-cols-[3fr_1.6fr] gap-12 items-center">

            {/* Left */}
            <div>
              {/* Badges row */}
              <div className="flex flex-wrap gap-2 mb-6">
                {badges.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    <Icon size={12} />
                    {text}
                  </div>
                ))}
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-5" style={{ letterSpacing: '-0.03em', textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}>
                Готовая еда<br />
                <span style={{ color: 'var(--color-accent)' }}>на неделю</span>
                <br />в Белграде
              </h1>

              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-lg" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
                Сочная, тёплая, ароматная еда — уже ждёт в холодильнике.
                Без готовки, таблиц и ежедневных заказов.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onOrderOpen}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-bold text-lg transition-all"
                  style={{
                    background: 'var(--color-primary)',
                    borderRadius: 'var(--radius-btn)',
                    boxShadow: '0 4px 20px rgba(208,57,94,0.55)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.transform = 'none'; }}
                >
                  Хочу попробовать
                  <ChevronRight size={18} />
                </button>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-white transition-all"
                  style={{
                    border: '2px solid rgba(255,255,255,0.6)',
                    borderRadius: 'var(--radius-btn)',
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(255,255,255,0.12)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                >
                  Посмотреть меню
                </a>
              </div>
            </div>

            {/* Right — 3 side meal photos */}
            <div className="hidden lg:flex flex-col gap-3">
              {sidePhotos.map(({ src, alt, label }) => (
                <div
                  key={label}
                  className="relative overflow-hidden h-28 w-full"
                  style={{ borderRadius: 'var(--radius-card)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
                >
                  <img src={src} alt={alt} loading="eager" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  <span
                    className="absolute bottom-2 left-3 text-xs font-bold text-white px-2 py-1 rounded"
                    style={{ background: 'var(--color-primary)' }}
                  >{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="py-3 overflow-hidden" style={{ background: 'var(--color-beige)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-[#5A4D44] text-sm font-medium mx-6">
              {item}
              <span style={{ color: 'var(--color-primary)' }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
