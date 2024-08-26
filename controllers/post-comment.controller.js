const {insertComment} = require('../models/insert-comment.model.js')

exports.postComment = (request, response, next) => {
    const { params, body } = request
    insertComment(params, body)
        .then((comment) => {
        response.status(201).send(comment)

    })
    .catch((err) => {

        next(err)
    })
}