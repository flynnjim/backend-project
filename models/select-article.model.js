const db = require('../db/connection')

exports.selectArticle = (article_id) => {

    const regex = /\D/

    if (regex.test(article_id)) {
        return Promise.reject({msg: "Bad request", status: 400})
    }

    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then((articleData) => {

        if (articleData.rows.length === 0) {
            return Promise.reject({msg: "Article not found", status: 404})
        }
        return articleData.rows
    })
}