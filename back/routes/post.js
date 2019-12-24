const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => { // api/post
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
router.post('/images', (req, res) => {

});

module.exports = router;