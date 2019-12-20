const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => { // 로그인 할 때 실행.
        return done(null, user.id); // 서버쪽세션에 [{id : 3, cookie : "asdf"}]
        // 이런식으로 생성하고 프론트쪽에 쿠키 저장.
    });
    // 다 끝나서 성공하면 실행해서 정보 저장. req login 할때 서버쪽에서 간직하고 있음.

    // 유저 정보를 계속 서버에 저장해두는게 아니고 필요하면 
    // 프론트에서 쿠키를 보내면 서버에서 deserializeUser를
    // 실행해서 db.User.findOne으로 정보를 찾아서 req.user에 저장함.
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findOne({
                where : {id},   // 프론트에서 쿠키를 보내오면 그 쿠키에 연결된 아이디로 유저정보를 
                //db에서 다시 찾아서 옴.
            });
            return done(null, user); // req.user에 저장.
        }catch(e) {
            console.error(e);
            return done(e);
        }
    });

    local();
}

// 프론트에서 서버로는 cookie(암호화 된 정보)만 보내고
// 서버가 받 쿠키파서, 익스프세스 세션으로 쿠키 검사 후 id 발견하면
// 저장 되어 있으면 deserializeuser 해서 정보를 빼줌.
// req.user로 사용자 정보가 들어감. ( 풀정보를 만들어 줌 )

// 요청 보낼때마다 deserializeUser가 실행 됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱(한번 찾은 유저는 다시 안 찾게)
// db 요청을 최대한 줄이는게 서버비용 아끼는거임.