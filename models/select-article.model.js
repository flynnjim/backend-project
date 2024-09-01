const db = require('../db/connection')

exports.selectArticle = (article_id) => {

    const regex = /\D/

    if (regex.test(article_id)) {
        return Promise.reject({msg: "Bad request", status: 400})
    }
    let articlesRowsData
    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
        .then((articleData) => {
            articlesRowsData = articleData.rows
            
            if (articleData.rows.length === 0) {
                return Promise.reject({msg: "Article not found", status: 404})
            }

            articlesRowsData.forEach((article) => {
                 article.comment_count = 0
                 return article
            })

            return db.query('SELECT * FROM comments')
                .then((comments) => {
                    const commentsData = comments.rows
                    commentsData.forEach((comment) => {
                        if (articlesRowsData[0].article_id === comment.article_id) {
                            articlesRowsData[0].comment_count++
                        }
                    })

                    return articlesRowsData
                })


    })
}