module.exports = ( sequelize, DataTypes ) => {
    const User = sequelize.define('User', {// 테이블 명이 자동으로 users로 바뀐다.
        nickname : {
            type: DataTypes.STRING(20),
            allowNull : false,
        },
        userId : {
            type: DataTypes.STRING(20),
            allowNull : false, // 필수
            unique : true, // 고유한 값
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
    }, {
        charset: 'utf8',
        collate : 'utf8_general_ci',
    });

    User.associate = (db) => {
        db.User.hasMany(db.Post, { as: 'Posts'}); // 관계가 불분명 할 때 as로 잘 정해줘야함.
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through : 'Like', as : 'Liked'});
        db.User.belongsToMany(db.User, { through : 'Follow', as : 'Followers', foreignKey : 'followingId'});
        db.User.belongsToMany(db.User, { through : 'Follow', as : 'Followings', foreignKey: 'followerId'});
    };
    // through 중간 테이블 명(관계 테이블) 
    // sequelize가 알아서 key를 만들어준다.4
    // as이름으로 데이터를 가지고 온다.
    return User;
}