FROM node:18

# Створюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і встановлюємо залежності
COPY backend/package*.json ./
RUN npm install

# Копіюємо решту проєкту
COPY backend/ .

# Відкриваємо порт (залежно від твого серверу, у нас 3000)
EXPOSE 3000

# Запускаємо сервер
CMD ["node", "server.js"]
