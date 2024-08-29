const db = require('../db/connection')


exports.selectAllArticles = (query) => {
    const { sort_by, order } = query

    const sortingOrder = order? order: "DESC"
    const sortingQuery = sort_by? sort_by: 'created_at'
    


let articlesRowsData
    return db.query(`SELECT * FROM articles ORDER BY ${sortingQuery} ${sortingOrder}`)
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