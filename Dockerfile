# Stage 2: Serve React app using Nginx
FROM nginx:alpine

# Копируем собранное приложение из первого этапа или просто копируем папку build
COPY ./dist /usr/share/nginx/html

# Открываем порт 80 для доступа
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]