const db = require('../db/connection')

exports.addVotes = (params, body) => {
    const { article_id } = params
    const { inc_votes } = body

    const objectKeys = Object.keys(body)
    const correctLength = objectKeys.length === 1
    const correctKeys = objectKeys.includes("inc_votes")

    const regex = /\D/
    const articleIdNotDigit = regex.test(params.article_id)
    const incVotesNotDigit = regex.test(body.inc_votes)

    if (!correctKeys || !correctKeys || incVotesNotDigit || articleIdNotDigit) {
        return Promise.reject({msg: "Bad request", status: 400})
    }
    
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *', [inc_votes, article_id])
    .then((articleUpdate) => {
        if (articleUpdate.rows.length === 0 ) {
            return Promise.reject({msg: "Article not found", status: 404})
        }
        return articleUpdate.rows
    })
}
