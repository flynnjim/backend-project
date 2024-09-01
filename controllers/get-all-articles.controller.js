const { selectAllArticles } = require('../models/select-all-articles.model.js')

exports.getAllArticles = (request, response, next) => {

    const { query } = request

    selectAllArticles(query)
        .then((articlesData) => {            
            response.status(200).send(articlesData)
        })
        .catch((err) => {
            next(err)
        })
}