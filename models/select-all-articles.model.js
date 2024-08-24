const db = require('../db/connection')


exports.selectAllArticles = () => {

    return db.query('SELECT * FROM articles')
        .then((articlesData) => {

            return articlesData.rows
        })
}