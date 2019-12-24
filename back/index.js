const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // 로그를 찍어준다.
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
// passport 프론트쪽에 쿠키 보내는거랑 서버쪽에 세션 두는거랑
// 매번 누가 현재 로그인 되어있는지 확인하는 작업을  모든 라우터에 붙여줘야 되기 때문에
// passport가 그걸 도와줌. 제일 안전.

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');


dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구.

app.use(morgan('dev'));  // 로그 찍어주는 설정.
app.use(cors({
    origin: true,
    credentials : true,
}));
app.use(express.json()); // json 형식 처리
app.use(express.urlencoded({ extended : true })); // form으로 넘어온 데이터 처리
// req.body 정상적으로 동작하게 해줌.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true, // 쿠키를 자바스크립트에서 접근 못함. 
        secure : false, // https를 쓸 때 true로
    },
    name : 'rbck',
}))

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});