const { getTopics } = require('./get-topics.controller')
const { getDocumentation } = require('./get-documentation.controller.js')
const { getArticle } = require('./get-article.controller.js')
const { getAllArticles } = require('./get-all-articles.controller.js')
const { getArticleComments } = require('./get-article-comments.controller.js') 

module.exports = { getTopics, getDocumentation, getArticle, getAllArticles, getArticleComments }
