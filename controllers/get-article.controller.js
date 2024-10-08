const { selectArticle } = require('../models/select-article.model.js')

exports.getArticle = (request, response, next) => {

    const {params : {article_id}} = request

    selectArticle(article_id).then((articleData) => {
        response.status(200).send({article: articleData[0]})
    })
    .catch((err) => {
        next(err)
    })
}