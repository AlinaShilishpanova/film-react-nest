# Film! — Backend (Nest.js + MongoDB)

Бэкенд онлайн-сервиса бронирования билетов в кинотеатр.

## Требования

- Node.js 18+
- MongoDB (локально или в облаке)

## Установка

```bash
npm install
```

## Настройка окружения

Скопируйте `.env.example` в `.env` и при необходимости отредактируйте:

```bash
cp .env.example .env
```

Параметры:
- `PORT` — порт приложения (по умолчанию `3000`)
- `DATABASE_DRIVER` — драйвер БД (`mongodb`)
- `DATABASE_URL` — строка подключения к MongoDB
- `DEBUG` — отладочные логи

## Запуск

```bash
# development (с автоперезагрузкой)
npm run start:dev

# production
npm run build
npm run start:prod
```

## Заполнение базы начальными данными

При первом старте, если коллекция `films` пуста, приложение автоматически
загрузит фильмы из `src/films/data/films.json`.

## API

Все маршруты начинаются с `/api/afisha`:

- `GET /films` — список фильмов
- `GET /films/:id/schedule` — расписание выбранного фильма
- `POST /order` — бронирование билетов

Статический контент раздаётся по `/content/afisha`.