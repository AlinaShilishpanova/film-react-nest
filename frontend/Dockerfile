# ---- build stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- production stage ----
# Образ только для того, чтобы отдать собранный dist в volume.
# В финальном образе минимум: только сам dist.
FROM alpine:3.19 AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "cp -r /app/dist/. /volume/ && echo 'Frontend build copied to volume'"]