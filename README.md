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

