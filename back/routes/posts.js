const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include : [{
                model : db.User,
                attributes : ['id', 'nickname'],
            }],
            order : [['createdAt', 'DESC']], // DESC 내림차순, ASC 오름차순
        })
        res.json(posts);
    } catch(e) {
        console.error(e);
        next(e)
    }
});

module.exports = router;