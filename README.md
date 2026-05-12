# Porta — демо-сайт сервиса готовой еды

Полностью функциональная посадочная страница + MVP-интерфейс для сервиса готовой еды в Белграде.

## Запуск проекта

```bash
npm install
npm run dev
```

Приложение откроется по адресу [http://localhost:5173](http://localhost:5173).

## Структура проекта

```
porta/
  src/
    components/     ← UI-компоненты (Header, Hero, MenuBuilder и т.д.)
    context/        ← CartContext — глобальная корзина (useReducer + localStorage)
    data/           ← Данные: блюда, наборы, FAQ, преимущества
    App.jsx         ← Корневой компонент, управление модалами
    main.jsx        ← Точка входа
    index.css       ← Tailwind + анимации
  public/           ← Статика (favicon)
  index.html
  package.json
  vite.config.js
  tailwind.config.js
```

## Как заменить данные

### Блюда
`src/data/meals.js` — массив из 20 объектов. Каждое блюдо содержит:
`id`, `name`, `category`, `description`, `ingredients`, `weight`, `calories`, `price` и другие поля.

### Наборы
`src/data/sets.js` — 5 наборов. Каждый набор ссылается на блюда по `id`.
Поле `meals` — список блюд с поддержкой замены (`originalMealId` / `currentMealId`).

### FAQ
`src/data/faq.js` — 12 вопросов и ответов.

### Преимущества
`src/data/benefits.js` — 6 карточек для секции «Почему Porta».

## Как подключить форму

Сейчас форма сохраняет заявку в `localStorage` под ключом `porta_last_order`.
Для реальной интеграции замените логику в `OrderModal.jsx` → функция `handleSubmit`:

**Вариант 1: Telegram Bot API**
```js
await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: `Новая заявка\nИмя: ${form.name}\nТел: ${form.phone}\nГород: ${form.city}\nКомментарий: ${form.comment}`,
  }),
})
```

**Вариант 2: Email через Resend / Mailgun / EmailJS**
```js
// EmailJS пример:
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
```

**Вариант 3: Webhook (Make / Zapier)**
```js
await fetch('https://hook.eu1.make.com/YOUR_WEBHOOK', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...form, items: state.items, total: state.total }),
})
```

## Демо-режим

Все цены, блюда, наборы и описания — демо-данные.
Онлайн-оплата не реализована.
Заявки сохраняются только в `localStorage` (поле `porta_last_order`).

## Технологии

- React 18 + Vite
- Tailwind CSS 3
- lucide-react (иконки)
- localStorage (корзина и заявки)
