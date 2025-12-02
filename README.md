# АрхМаршрут - Tauri Desktop Application

## Ветка lab6-tauri

Нативное настольное приложение на Tauri для работы с археологическими артефактами.

## Требования

- Node.js 18+
- Rust (для сборки Tauri)
- Запущенный backend на `localhost:8000` или другом IP

## Установка зависимостей

```bash
npm install
```

## Настройка для локальной сети

1. Узнайте IP адрес вашего компьютера:
   - macOS: `ipconfig getifaddr en0`
   - Linux: `ip addr show`
   - Windows: `ipconfig`

2. Создайте файл `.env` со значениями:
```env
VITE_API_BASE_URL=http://192.168.1.100:8000/api
VITE_IMAGE_SERVER=http://192.168.1.100:9000
```

Замените `192.168.1.100` на ваш реальный IP адрес.

## Запуск в режиме разработки

```bash
npm run tauri:dev
```

## Сборка production приложения

```bash
npm run tauri:build
```

Исполняемый файл будет создан в:
- macOS: `src-tauri/target/release/bundle/macos/`
- Windows: `src-tauri/target/release/bundle/msi/`
- Linux: `src-tauri/target/release/bundle/deb/` или `appimage/`

## Структура проекта

- `/src` - React frontend код
- `/src-tauri` - Rust backend для Tauri
- `/dist` - Собранные файлы frontend

## Особенности

- Работает как нативное приложение
- Подключение к API через локальную сеть
- Поддержка изображений через внешний сервер
- 3 основные страницы: Главная, Каталог, Детали артефакта
