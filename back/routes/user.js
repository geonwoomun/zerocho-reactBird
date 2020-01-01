const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn} = require('./middleware');

router.get('/', isLoggedIn, (req, res) => {
    const user = Object.assign({}, req.user.toJSON());
    delete user.password
    return res.json(user);
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
router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것. ex)/3 
    // req.params.id 로 가져올 수 있따 :id는.
    try {
        const user = await db.User.findOne({
            where : {
                id : parseInt(req.params.id, 10)
            },
            include : [{
                model : db.Post,
                as : 'Posts',
                attributes : ['id'],
            }, {
                model : db.User,
                as : 'Followings',
                attributes : ['id'],
            }, {
                model : db.User,
                as : 'Followers',
                attributes : ['id'],
            }],
            attributes : ['id','nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.json(jsonUser);
    } catch(e) {
        console.err(e);
        next(e);
    }
});
router.post('/logout', isLoggedIn, (req, res) => { // /api/user/logout
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
        return req.login(user, async (loginErr) => { // login 하면 session, cookie로 정보 저장.
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where : { id : user.id},
                    include : [{
                        model : db.Post,
                        as : 'Posts',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as : 'Followings',
                        attributes: ['id'],
                    },{
                        model :db.User,
                        as : 'Followers',
                        attributes : ['id'],
                    }],
                    attributes: ['id', 'nickname', 'userId'],
                })
                return res.json(fullUser); // 비밀번호를 지운 정보를 프론트쪽으로 보낸다.
            }
            catch (e) {
                next(e);
            }
        });
    })(req, res, next)
});
router.get('/:id/follow', (req, res) => { // /api/user/:id/follow

});
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try{
        const me = await db.User.findOne({
            where : {id : req.user.id},
        });
        await me.addFollowing(req.params.id);
        res.send(req.params.id);
    } catch(e) {
        console.error(e);
        next(e);
    }
});
router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
    try {
       const user = await db.User.findOne({
           where : {id : parseInt(req.params.id, 10)},
       });
       const followers = await user.getFollowers({
           attributes : ['id', 'nickname'],
       });
       res.json(followers);
    }catch(e) {
        console.error(e);
        next(e);
    }
});
router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where : {id : parseInt(req.params.id, 10) || 
                (req,user && req.user.id) || 0}
        });
        const followers = await user.getFollowings({
            attributes : ['id', 'nickname'],
        });
        res.json(followers);
    }catch(e) {
        console.error(e);
        next(e);
    }
});
router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where : { id : req.user.id},
        });
        await me.removeFollower(req.params.id);
        res.send(req.params.id);
    }catch(e) {
        console.error(e);
        next(e);
    }
});
router.delete('/:id/follow', async (req, res, next) => {
    try{
        const me = await db.User.findOne({
            where : {id : req.user.id},
        });
        await me.removeFollowing(req.params.id);
        res.send(req.params.id);
    } catch(e) {
        console.error(e);
        next(e);
    }
});
router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            where : {
                UserId : parseInt(req.params.id, 10) || (req,user && req.user.id) || 0,
                RetweetId : null,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }, {
                model: db.Image,
            },{
                model: db.User,
                through : 'Like',
                as: 'Likers',
                attributes : ['id'],
            }]
        });
        res.json(posts);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await db.User.update({
            nickname : req.body.nickname,
        }, {
            where : {id : req.user.id},
        });
        res.send(req.body.nickname);
    }catch(e) {
        console.error(e);
        next(e);
    }
})
module.exports = router;