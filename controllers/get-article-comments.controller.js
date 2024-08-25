const { getComments } = require('../models/get-comments.model.js')

exports.getArticleComments = (request, response) => {
    const { params : { article_id} } = request

    getComments(article_id).then((commentData) => {
        response.status(200).send(commentData)
    })
}