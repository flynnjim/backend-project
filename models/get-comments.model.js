const db = require('../db/connection')

exports.getComments = (article_id) => {

    const regex = /\D/

    if (regex.test(article_id)){
        return Promise.reject({msg: "Bad request", status: 400})
    }

    return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC', [article_id])
        .then((data) => {
            const commentsData = data.rows
            
            if (commentsData.length === 0) {
                return Promise.reject({msg: "Comments not found", status: 404})
            }
  
            return commentsData
        })
}