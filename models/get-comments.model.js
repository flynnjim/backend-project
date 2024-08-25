const db = require('../db/connection')

exports.getComments = (article_id) => {

    return db.query('SELECT * FROM comments WHERE article_id = $1', [article_id])
        .then((data) => {
            const commentsData = data.rows
  
            return commentsData
        })
}