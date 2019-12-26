const express = require('express');
const next = require('next');
const margan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');


const dev = process.env.NODE_ENV !== 'production';
const prod =process.env.NODE_ENV === 'production';


const app = next({dev}); // app이 next
const handle = app.getRequestHandler(); //get 요청처리기
dotenv.config();

app.prepare().then(() => { // next가 express를 돌리는 듯..?
    const server = express();
    server.use(margan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({extended : true}));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave: false,
        saveUninitialized : false,
        secret : '',
        cookie : {
            httpOnly: true,
            secure : false,
        },
    }));

    server.get('/hashtag/:tag', (req, res) => {
        return app.render(req,res, '/hashtag', { tag : req.params.tag})//app이 next임
    }); //동적인 주소를 나타내기 위해 /hashtag랑 pages의 /hashtag랑 연결을 해줌
    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', { id : req.params.id});
    }); // 4번째 인자가 pages로 같이 내려가게된다.

    server.get("*", (req, res) => {
        return handle(req, res);
    })
    server.listen(3060, () => {
        console.log('next+express running on port 3060');
    })
});