const { getTopics } = require('./get-topics.controller')
const { getDocumentation } = require('./get-documentation.controller.js')
const { getArticle } = require('./get-article.controller.js')
const { getAllArticles } = require('./get-all-articles.controller.js')
const { getArticleComments } = require('./get-article-comments.controller.js') 
const { postComment } = require('./post-comment.controller.js')
const { patchArticle } = require('./patch-article.controller.js')
const { deleteComment } = require('./delete-comment.controller.js')

module.exports = { getTopics, getDocumentation, getArticle, getAllArticles, getArticleComments, postComment, patchArticle, deleteComment }
