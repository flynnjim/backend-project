const { addVotes } = require('../models/add-votes.model.js')

exports.patchArticle = (request, response, next) => {
    const { params, body} = request
    addVotes(params, body).then((article) => {
        response.status(200).send(article)    
    })
}