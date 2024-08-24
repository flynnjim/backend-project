const { selectAllArticles } = require('../models/select-all-articles.model.js')

exports.getAllArticles = (request, response) => {

    selectAllArticles()
        .then((articlesData) => {
            response.status(200).send(articlesData)
        })
}