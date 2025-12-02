# АрхМаршрут - Frontend

Фронтенд-приложение для платформы изучения и анализа археологических находок.

## Описание проекта

АрхМаршрут - это React-приложение, предоставляющее интерфейс для просмотра каталога археологических артефактов, их поиска и детального изучения. Приложение разработано с использованием React, TypeScript и Vite.

## Основные возможности

- **Главная страница** - статическое описание платформы и её возможностей
- **Каталог артефактов** - список всех доступных археологических находок
- **Поиск** - текстовый поиск по названию артефакта
- **Детальная страница артефакта** - полная информация об артефакте с изображением
- **Навигация** - Header с ссылками на основные страницы
- **Breadcrumbs** - самописная навигационная цепочка для отслеживания пути пользователя

## Технологический стек

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Vite** - сборщик и dev-сервер
- **React Router** - маршрутизация
- **Bootstrap 5** (минимально) - базовые стили

## Установка и запуск

### Требования

- Node.js 18+
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173/

### Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.

## Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Header.tsx          # Навигационная панель с ссылками
│   ├── Breadcrumbs.tsx     # Самописная навигационная цепочка
├── pages/              # Страницы приложения
│   ├── Home.tsx           # Главная страница
│   ├── Catalog.tsx        # Каталог артефактов
│   └── ArtifactDetail.tsx # Детальная страница артефакта
├── services/           # API сервисы
│   └── artifactService.ts # Сервис для работы с артефактами
├── data/               # Моковые данные
│   └── mockArtifacts.ts   # Данные для fallback при недоступности бэкенда
├── types/              # TypeScript типы
│   └── artifact.ts        # Типы для артефактов и фильтров
└── App.tsx             # Главный компонент приложения
```

## Структура данных (Artifact)

Интерфейс артефакта соответствует структуре бэкенда:

```typescript
interface Artifact {
  id: number;
  created_at: string;
  name: string;
  description: string;
  is_active: boolean;
  image_url?: string | null;
  production_center: string;
}
```

## Особенности реализации

### Поиск и фильтрация

Поиск реализован с учетом работы как с бэкендом, так и с моковыми данными:

1. **На бэкенде** - параметр `query` передается через URL
2. **На фронтенде (fallback)** - если бэкенд недоступен, используются моковые данные с клиентской фильтрацией

### CORS и проксирование

В `vite.config.ts` настроено проксирование запросов:
- Все запросы к `/api/*` перенаправляются на `http://localhost:8080`
- Это решает проблемы с CORS при разработке

### Изображения по умолчанию

Для артефактов без изображения используется placeholder через сервис `via.placeholder.com`.

### Fetch API

Все запросы к бэкенду выполняются через встроенный `fetch` API без использования сторонних библиотек типа axios.

## API Endpoints

Приложение ожидает следующие endpoints от бэкенда:

- `GET /api/artifacts` - получение списка артефактов (с query-параметром `query` для поиска)
- `GET /api/artifacts/:id` - получение детальной информации об артефакте
- `POST /api/artifacts/:id/add-to-analysis` - добавление артефакта в анализ

### Query-параметры для фильтрации:

- `query` - поиск по названию
- `is_active` - только активные артефакты
- `production_center` - фильтр по центру производства

## Важные замечания

- **Без Redux/Context** - состояние управляется только через useState/props
- **Самописные breadcrumbs** - компонент написан вручную, без использования готовых библиотек
- **Минимальное использование Bootstrap** - используется только для базовых стилей через CSS

## Лицензия

MIT

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
