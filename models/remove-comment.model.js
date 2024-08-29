const db = require('../db/connection')

exports.removeComment = (params) => {
    const { comment_id } = params

    return db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id])
        .then((removedComment) => {
            if (removedComment.rowCount === 0 ) {
                return Promise.reject({msg: "Comment not found", status: 404})
            } else {
                return removedComment.rows
            }
        })
}
