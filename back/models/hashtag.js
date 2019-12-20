module.exports = ( sequelize, DataTypes ) => {
    const Hashtag = sequelize.define('Hashtag', {
        name: {
            type: DataTypes.STRING(20),
            allowNull : false,
        },
    }, {
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through : 'PostHashtag'})
    }; // 다대다 관계     관계테이블을 through에 적는다.
    return Hashtag;
}