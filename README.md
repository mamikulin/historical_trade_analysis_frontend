# АрхМаршрут - PWA Application

## Ветка lab6-pwa

Progressive Web Application для работы с археологическими артефактами.

## Функционал

### Redux Toolkit
- Хранение фильтров поиска в Redux store
- Сохранение состояния между переходами
- Используйте Redux DevTools для отладки

### PWA Features
- Установка как приложение (Add to Home Screen)
- Offline режим через Service Worker
- Кэширование API запросов
- Быстрая загрузка

### Адаптивность
- **Mobile (до 640px)**: 1 колонка карточек
- **Tablet (641-1024px)**: 2 колонки
- **Desktop Small (1025-1280px)**: 3 колонки  
- **Desktop Large (1281px+)**: 4 колонки

## Запуск локально (БЕЗ BUILD)

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Тестирование PWA

1. Откройте в Chrome DevTools → Application → Service Workers
2. Проверьте регистрацию Service Worker
3. Включите Offline mode и перезагрузите страницу
4. Установите PWA: нажмите на иконку установки в адресной строке

## Redux Store

**Фильтры:**
- `searchQuery` - текст поиска
- `productionCenter` - центр производства
- `isActive` - статус активности

**Actions:**
- `setSearchQuery(string)` - установить поисковый запрос
- `setProductionCenter(string)` - установить центр
- `setIsActive(boolean)` - установить статус
- `resetFilters()` - сбросить все фильтры

## Адаптивные breakpoints

```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { ... }

/* Desktop Small */
@media (min-width: 1025px) and (max-width: 1280px) { ... }

/* Desktop Large */
@media (min-width: 1281px) { ... }
```

## Структура

- `/src/store` - Redux store и slices
- `/src/store/hooks.ts` - Typed Redux hooks
- `vite.config.ts` - PWA configuration
- Service Worker генерируется автоматически

## Демонстрация для лаб.работы

1. Открыть на телефоне → сохранить PWA
2. Применить фильтр → перейти на главную → вернуться (фильтр сохранён)
3. Перейти в адаптивный режим браузера → поменять ширину
4. Показать в коде настройки колонок в CSS файлах
