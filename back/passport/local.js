const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {  // local 부분 실행.
    passport.use(new LocalStrategy({
        usernameField : 'userId', // req.body의 속석명을 입력
        passwordField : 'password',
    }, async (userId, password, done) => {
        try {
            const user = await db.User.findOne({
                where : {
                    userId
                }
            });
            if (!user) {
                return done(null, false, { reason : '존재하지 않는 사용자 입니다.'})
            } // done: passport에서는 첫번째 부분 : 서버쪽 에러, 두번째 인수 : 성공했을 때, 3번째 : 서버 에러는 아닌데 로직에서 에러가 났을 때
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user); // 문제없이 user가 들어가면.  즉 done이 router에서 그 다음 있는 콜백 함수인 것 같다.
            }
            return done(null, false, { reason : '비밀번호가 틀립니다.'});
        } catch(e) {
            console.error(e);
            return done(e);
        }
    }));
};