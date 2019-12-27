const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({
            include : [{
                model : db.Hashtag,
                where :{name : decodeURIComponent(req.params.tag)}
            },// 한글 특수문자 등은 외계어처럼 바뀌어서 decodeURIComponent로 바꿔줘야함.
        {
            model : db.User,
            attributes : ['id', 'nickname'],
            }],
        });
        res.json(posts);
    }catch(e){
        console.error(e);
        next(e) 
    }

})

module.exports = router;