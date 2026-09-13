# FILM!

Онлайн-сервис бронирования билетов в кинотеатр. Состоит из фронтенда на React (Vite) и бэкенда на Nest.js с MongoDB.

## Структура проекта

- `backend/` — Nest.js API (порт 3000)
- `frontend/` — React-приложение (порт 5173)

## Требования

- Node.js 18+
- MongoDB

## Установка и запуск

### MongoDB

Установите MongoDB с официального сайта или через пакетный менеджер вашей ОС.

Убедитесь, что MongoDB запущена на `127.0.0.1:27017`.

### Бэкенд

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

В `.env` при необходимости укажите:

- `PORT` — порт приложения (по умолчанию `3000`)
- `DATABASE_DRIVER` — тип драйвера СУБД (`mongodb`)
- `DATABASE_URL` — адрес MongoDB, например `mongodb://127.0.0.1:27017/film`

При первом запуске, если коллекция `films` пуста, приложение автоматически
загрузит данные из `backend/src/films/data/films.json`.

### Фронтенд

Во втором терминале:

```bash
cd frontend
npm install
npm run dev
```

Откройте `http://localhost:5173/`.

## API

Все маршруты начинаются с `/api/afisha`:

- `GET /films` — список фильмов
- `GET /films/:id/schedule` — расписание выбранного фильма
- `POST /order` — бронирование билетов

Статический контент раздаётся по `/content/afisha`.