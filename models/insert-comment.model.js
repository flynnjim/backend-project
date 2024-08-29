const db = require('../db/connection')

exports.insertComment = (params, body) => {

    const objectKeys = Object.keys(body)
    const correctLength = objectKeys.length === 2
    const correctKeys = objectKeys.includes("body") && objectKeys.includes("author")

    const regex = /\D/
    
    const { author } = body
    const commentBody = body.body
    const  {article_id } = params
    
    if (!correctKeys || !correctLength || regex.test(article_id)) {
        return Promise.reject({msg: "Bad request", status: 400})
    }

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

