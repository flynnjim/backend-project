const db = require('../db/connection')


exports.selectAllArticles = () => {
let articlesRowsData
    return db.query('SELECT * FROM articles ORDER BY created_at DESC')
        .then((articlesData) => {
             articlesRowsData = articlesData.rows
  
            articlesRowsData.forEach((article) => {
                delete article.body
                article.comment_count = 0
            })
            return db.query('SELECT * FROM comments')
                .then((comments) => {
                    const commentsData = comments.rows
                    commentsData.forEach((comment) => {
                        articlesRowsData.forEach((article) => {
                            if (article.article_id === comment.article_id) {
                                article.comment_count++
                            }
                        })
                    })
                    return articlesRowsData
                })
        })
}