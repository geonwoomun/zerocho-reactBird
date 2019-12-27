const express = require('express');
const db = require('../models');
const router = express.Router();
const path = require('path');
const {isLoggedIn} = require('./middleware');
const multer = require('multer');

router.post('/', isLoggedIn, async (req, res, next) => { // api/post
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g); // 해시태그 정규표현식
        const newPost = await db.Post.create({
            content : req.body.content,
            UserId: req.user.id, 
        });
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
                where : {
                    name : tag.slice(1).toLowerCase()
                }
            })));
            await newPost.addHashtags(result.map(r => r[0]))
        }
        const fullPost =  await db.Post.findOne({
            where : {
                id : newPost.id
            },
            include : [{
                model : db.User,
            }],
        })
        res.json(fullPost);
    } catch(e){
        console.error(e);
        next(e);
    }
});
const upload = multer({ // 이미지, 파일, 동영상 업로드 가능
    storage : multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads'); // 에러, 성공했을 때
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + new Date().valueOf() + ext);
        },
    }),
    limits : { fileSize : 20 * 1024 * 1024 }, // 너무 크게 하면 해커들이 공격할 수 있다. 너무 작게 하면 이미지 올리는데 애먹음.
});                  
router.post('/images', upload.array('image'), async (req, res, next) => { 
     // array 여러개, single 한개, fields 는 formdata에 저장된 키가 다를 때. none은 아무것도 안 올렸을 때
     res.json(req.files.map(v => v.filename));
});

router.get('/:id/comments', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({where : {id : req.params.id}});
        if (!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where : {
                PostId : req.params.id
            },
            order : [['createdAt', 'ASC']],
            include : [{
                model : db.User,
                attributes : ['id', 'nickname'],
            }]
        });
        res.json(comments);
    }catch(e) {
        console.error(e);
        next(e);
    }
})

router.post('/:id/comment',isLoggedIn, async (req, res, next) => { // POST /api/post/3/comment
    try {
        const post = await db.Post.findOne({where : {id: req.params.id}});
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId : post.id,
            UserId : req.user.id,
            content : req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where : {
                id : newComment.id,
            },
            include : [{
                model : db.User,
                attributes : ['id', 'nickname'],
            }],
        });
        return res.json(comment);
    } catch(e){
        console.error(e);
        return next(e);
    }
})

module.exports = router;