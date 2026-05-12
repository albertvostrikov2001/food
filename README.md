# Easy Food — сайт готовой еды в Белграде

## О проекте
Easy Food — демо-сайт сервиса готовой охлаждённой еды на неделю в Белграде.
На производственной базе Easy Freezy.

## Запуск
```bash
npm install
npm run dev
```

## Сборка
```bash
npm run build
```

## Деплой на GitHub Pages
```bash
npm run deploy
```

## Структура
```
src/components/   — UI-компоненты
src/data/         — данные (блюда, наборы, FAQ)
src/context/      — CartContext (корзина)
```

## Как заменить данные
- Блюда: `src/data/meals.js`
- Наборы: `src/data/sets.js`
- FAQ: `src/data/faq.js`

## Как подключить форму
Форма сохраняет данные в `localStorage` (ключ `easyfood_last_order`).
Для реальной отправки подключи Telegram Bot API или email-сервис
(Formspree / EmailJS) в `OrderModal.jsx → handleSubmit`.

## Цветовая система
CSS-переменные: `src/index.css → :root`  
Tailwind-токены: `tailwind.config.js → extend.colors` (префикс `easy-`)

## Демо-режим
Все цены, блюда и наборы — демо-данные.
Реальные цены уточняются после подтверждения заказа.
