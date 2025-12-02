# АрхМаршрут - GitHub Pages Deployment

## Ветка lab6-pages

Автоматический деплой на GitHub Pages с PWA, Redux и адаптивным дизайном.

## URL приложения

https://mamikulin.github.io/rip_frontend/

## Функционал

- ✅ PWA (можно установить как приложение)
- ✅ Redux для хранения фильтров
- ✅ Адаптивный дизайн (1-4 колонки)
- ✅ Service Worker для offline режима
- ✅ Работа с mock данными

## Автодеплой

При пуше в ветку `lab6-pages` автоматически:
1. Собирается production build
2. Деплоится на GitHub Pages
3. Доступно по ссылке выше

## Локальная сборка

```bash
npm install
npm run build
```

Результат в папке `dist/`

## Настройка GitHub Pages

1. Перейдите в Settings → Pages
2. Source: GitHub Actions
3. Workflow запустится автоматически

## Конфигурация

**vite.config.ts:**
```typescript
base: '/rip_frontend/'
```

**GitHub Actions:**
- `.github/workflows/deploy.yml`
- Триггер: push в lab6-pages
- Build: Node.js 20 + npm ci + npm run build

## Демонстрация

1. Открыть на компьютере GitHub Pages
2. Показать работу с бэкендом (если запущен локально)
3. Открыть на телефоне → установить PWA
4. Применить фильтр → перейти на главную → вернуться
5. Адаптивный режим браузера → изменить ширину
6. Показать код: количество колонок в Catalog.css

## Структура проекта

```
dist/                 # Собранный фронтенд
├── index.html
├── assets/
└── manifest.webmanifest

.github/
└── workflows/
    └── deploy.yml    # GitHub Actions workflow

src/
├── store/            # Redux store
├── pages/            # React компоненты
└── services/         # API сервисы
```
