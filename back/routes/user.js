const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {

});
router.post('/', async (req, res, next) => {
    try{
        const exUser = await db.User.findOne({
            where : {
                userId : req.body.userId,
            }
        });
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10에서 13 사이로 많이한다.
        const newUser = await db.User.create({
            nickname : req.body.nickname,
            userId : req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        return res.json(newUser); // send는 문자열을 보내는 것. json은 json 데이터를 보내는 것.
    }catch (e) {
        console.error(e);
        // 에러 처리를 여기서
        return next(e); // next 보통 에러가 났을 때. 알아서 프론트에 에러가 났다고 알려줌.
    }
});
router.get('/:id', (req, res) => { // 남의 정보 가져오는 것. ex)/3 
    // req.params.id 로 가져올 수 있따 :id는.
});
router.post('/logout', (req, res) => { // /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});
router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info)=> {
        console.log(info);
        if (err) { // 서버상의 에러 err, 성공 했을 때 결과 user, 로직상 정보 info
            console.error(err); // 정보가 들어오면 passport의 local 부분을 실행한다.
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, (loginErr) => { // login 하면 session, cookie로 정보 저장.
            if (loginErr) {
                return next(loginErr);
            }
            console.log('login success', req.user);
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return res.json(filteredUser); // 비밀번호를 지운 정보를 프론트쪽으로 보낸다.
        });
    })(req, res, next)
});
router.get('/:id/follow', (req, res) => { // /api/user/:id/follow

});
router.post('/:id/follow', (req, res) => {

});
router.delete('/:id/follower', (req, res) => {

});
router.delete('/:id/follow', (req, res) => {

});
router.get('/:id/posts', (req, res) => {

});

module.exports = router;