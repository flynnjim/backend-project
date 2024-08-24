const { selectArticle } = require('../models/select-article.model.js')

exports.getArticle = (request, response) => {

    const {params : {article_id}} = request

    selectArticle(article_id).then((articleData) => {
        response.status(200).send(articleData)
    })
}