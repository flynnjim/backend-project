const { removeComment } = require('../models/remove-comment.model.js')

exports.deleteComment = (request, response, next) => {
    const { params } = request

    removeComment(params)
        .then((removedComment) => {
            
            response.status(204).send()
        })
        .catch((err) => {
            next(err)
    })
}