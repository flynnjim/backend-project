const db = require('../db/connection')

exports.insertComment = (params, body) => {

    const { author } = body
    const commentBody = body.body
    const  {article_id } = params

    return db.query('INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *', [commentBody, author, article_id])
        .then((commentData) => {
            return commentData.rows
        })
        .catch((err) => {
            if (err.code === "23503") {
                return Promise.reject({msg: "Bad request", status: 400})
            }
        })
}

