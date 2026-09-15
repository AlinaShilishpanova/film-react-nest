# FILM!

Онлайн-сервис бронирования билетов в кинотеатр. Состоит из фронтенда на React (Vite) и бэкенда на Nest.js с PostgreSQL.

## Структура проекта

- `backend/` — Nest.js API (порт 3000)
- `frontend/` — React-приложение (порт 5173)

## Требования

- Node.js 18+
- PostgreSQL

## Установка и запуск

### PostgreSQL

Установите PostgreSQL и создайте базу данных и пользователя. Параметры подключения укажите в `backend/.env`.

Тестовые данные для заполнения БД лежат в `backend/test/`:
- `prac.init.sql` — создаёт таблицы
- `prac.films.sql` — заполняет таблицу фильмов
- `prac.shedules.sql` — заполняет таблицу сеансов

### Бэкенд

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Параметры `.env`:
- `PORT` — порт приложения (по умолчанию `3000`)
- `DATABASE_DRIVER` — драйвер БД (`postgres`)
- `DATABASE_URL` — строка подключения к PostgreSQL
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME` — параметры подключения
- `DATABASE_USERNAME`, `DATABASE_PASSWORD` — логин и пароль пользователя БД
- `DEBUG` — отладочные логи

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

## Ссылка на задеплоенное приложение

http://51.250.47.219/

Приложение развёрнуто на виртуальной машине Yandex Cloud. Для доступа используется публичный IP-адрес, так как сервис выдачи доменов `domain.nomoreparties.site` в данный момент недоступен.

Выдает текст:
Страница не найдена
Если вы искали на ней что-то конкретное,
спросите об этом Яндекс:
 
http://domain.nomoreparties.site/
 
Техническая информация: ошибка dnserror