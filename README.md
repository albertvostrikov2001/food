# Easy Food — Готовая еда на неделю в Белграде

Landing page + MVP для продажи готовых охлаждённых блюд в Белграде.  
React 18 + Vite + TailwindCSS. Русскоязычный интерфейс.

**Сайт:** https://albertvostrikov2001.github.io/food/

---

## Запуск

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # сборка в /dist
npm run deploy    # деплой на GitHub Pages
```

---

## Структура проекта

```
porta/
├── public/
│   └── images/           ← все фото (37 файлов, ~5 MB)
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── FeaturedMeals.jsx   ← новый блок (8 аппетитных блюд)
│   │   ├── MealCard.jsx
│   │   ├── SetCard.jsx
│   │   ├── MenuBuilder.jsx
│   │   ├── Pricing.jsx
│   │   ├── Benefits.jsx
│   │   ├── Audience.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── B2BSection.jsx
│   │   ├── FridgeBlock.jsx     ← новый блок (еда в холодильнике)
│   │   ├── Gallery.jsx         ← новый блок (галерея)
│   │   ├── Production.jsx
│   │   ├── FAQ.jsx
│   │   ├── FinalCTA.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CartDrawer.jsx
│   │   └── OrderModal.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   └── data/
│       ├── meals.js            ← 20 блюд с imageUrl и imageAlt
│       ├── sets.js             ← 5 наборов с coverImage
│       ├── faq.js
│       └── imageSources.js     ← источники всех фото (Unsplash)
└── index.html
```

---

## Как заменить фотографии

Все фото хранятся в `/public/images/`. Имена файлов задаются в:
- `src/data/meals.js` — поле `image` у каждого блюда
- `src/data/sets.js` — поле `coverImage` у каждого набора
- `src/components/Hero.jsx` — константа `sidePhotos` + src у главного фото
- `src/components/Gallery.jsx` — массив `images`
- `src/components/FridgeBlock.jsx` — src у тега `<img>`
- `src/components/B2BSection.jsx` — src у тега `<img>`

Замена:
1. Сохраните новое фото в `/public/images/` (WebP или JPG)
2. Укажите правильный путь в соответствующем файле данных или компоненте
3. Обновите `src/data/imageSources.js` — добавьте новый источник

---

## Где менять список блюд

**`src/data/meals.js`** — 20 объектов. Каждый содержит:

```js
{
  id, name, category, categoryLabel, tagline,
  description, ingredients,
  weight, calories, protein, fat, carbs,
  price, shelfLife, reheatTime,
  badges,           // ['популярное', 'для офиса', …]
  image,            // '/food/images/meal-01-oatmeal.jpg'
  imageAlt,         // 'Название — пример блюда'
}
```

---

## Где менять наборы

**`src/data/sets.js`** — 5 наборов. Каждый содержит:

```js
{
  id, name, tagline, description, days, forPersons,
  totalMeals, price, basePrice, saving,
  coverImage,       // '/food/images/set-trial.jpg'
  badge, highlight, cta,
  meals: [{ day, mealType, currentMealId, originalMealId }]
}
```

---

## Цветовая система

Все цвета определены как CSS-переменные в `src/index.css` (`--color-primary`, `--color-accent`, …)
и продублированы в `tailwind.config.js` (префикс `easy-*`).

---

## Форма заявки

Демо-версия. Данные сохраняются в `localStorage` (ключ `easyfood_last_order`).
Для боевой версии подключите FormSpree, Netlify Forms или собственный API.

---

## LEGAL — Важная информация об изображениях

> ⚠️ **Изображения используются как демо-контент для прототипа.**  
> Перед коммерческим запуском необходимо заменить фото на собственные  
> или финально лицензированные. Фото на сайте не являются фотографиями  
> реальных блюд бренда Easy Food.

Все демо-фото взяты с [Unsplash](https://unsplash.com/) под [Unsplash License](https://unsplash.com/license)  
(бесплатное использование, без обязательной атрибуции).

### Полный список источников

| Файл | Unsplash Photo ID | Лицензия |
|------|-------------------|----------|
| hero-main.jpg | 1504674900247-0877df9cc836 | Unsplash License |
| hero-side-1.jpg | 1546069901-ba9599a7e63c | Unsplash License |
| hero-side-2.jpg | 1512621776951-a57141f2eefd | Unsplash License |
| hero-side-3.jpg | 1547592180-85f173990554 | Unsplash License |
| meal-01…meal-20.jpg | see imageSources.js | Unsplash License |
| set-trial.jpg | 1466637574441-749b8f19452f | Unsplash License |
| gallery-1…gallery-6.jpg | see imageSources.js | Unsplash License |
| fridge.jpg | 1482049016688-2d3e1b311543 | Unsplash License |
| b2b-office.jpg | 1509722747041-616f39b57569 | Unsplash License |

Полная таблица с автором, URL и примечаниями — в `src/data/imageSources.js`.

---

## Деплой на GitHub Pages

```bash
npm run deploy
```

Скрипт: `deploy-gh-pages.mjs` — пушит папку `dist/` в ветку `gh-pages`.  
Живой сайт: https://albertvostrikov2001.github.io/food/
