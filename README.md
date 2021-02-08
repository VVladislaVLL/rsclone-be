# Plants vs Zombies

Этот репозиторий содержит back-end код для игры [https://plants-vs-zombies-rsclone.netlify.app/](https://plants-vs-zombies-rsclone.netlify.app/)

Документация: https://rs-plants-vs-zombies.herokuapp.com/doc/

Деплой: https://rs-plants-vs-zombies.herokuapp.com/


### Для запуска локально:

` $ git clone https://github.com/ellankz/rsclone-be `

` $ cd rsclone-be `

` $ npm install `

Для работы нужно также создать в корне папки файл .env с таким содержимым:

```
NODE_ENV=development
PORT=4000
AUTH_MODE=false
JWT_SECRET_KEY=XXXXXXXXXXXXXXXXXXX - любая строка
MONGO_CONNECTION_STRING=XXXXXXXXXXXXXXXXXXX - строка подключения к mongoDB
```

` $ npm run start:dev `

После этого сервер доступен по адресу http://localhost:4000/

### Технический стек

1. Node.js
2. фреймворк Express.js для обработки запросов к серверу и применения различных 'middleware'
3. mongoose для работы с MongoDB и сохранения данных
4. Passport и JWT для аутентификации на сервере
5. UUID для создания уникальных id всем объектам в памяти, 
6. Winston для логирования всех запросов и ошибок, сохраняет логи в файл и печатает в консоль 
7. Joi для валидации входящих данных
8. TypeScript (делает код более прозрачным и позволяет избежать множества ошибок
9. ESLint с конфигурацией airbnb-base для однородности кода и моментального отлова некоторых ошибок
