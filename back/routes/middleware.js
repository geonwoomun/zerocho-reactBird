exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // 에러를 넣으면 에러처리 미들웨어로 넘어가고 안 넣으면 다음 미들웨어로.
    }else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next(); // 에러를 넣으면 에러처리 미들웨어로 넘어가고 안 넣으면 다음 미들웨어로.
    }else {
        res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
} 


// 공통된 로직을 분리, 밑에꺼는 그냥 끝내는 것임.