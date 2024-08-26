const db = require('../db/connection')

exports.addVotes = (params, body) => {
    const { article_id } = params
    const { inc_votes } = body
    
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *', [inc_votes, article_id])
    .then((articleUpdate) => {
        return articleUpdate.rows
    })
}
