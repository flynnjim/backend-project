const express = require('express')
const app = express()
const {getTopics, getDocumentation, getArticle, getAllArticles, getArticleComments} = require('./controllers/index.controllers')

app.get('/api/topics', getTopics)

app.get('/api', getDocumentation)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.all('*', (request, response) => {
    response.status(404).send({msg: "Sorry, the endpoint you are searching for does not exist."})
})

app.use((err, request, response, next) => {
    const {status, msg} = err
    if (err.msg === "Bad request") {
        response.status(status).send({msg})
    } else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    const {status, msg} = err
    if (err.msg === "Article not found") {
        response.status(status).send({msg})
    }
    next(err)
})

app.use((err, request, response, next) => {
    const {status, msg} = err
    response.status(500).send({err})
})

module.exports = app;

/*

CORE: GET /api/articles
Description
Should:

be available on /api/articles.
get all articles.
Responds with:

an articles array of article objects, each of which should have the following properties:
author
title
article_id
topic
created_at
votes
article_img_url
comment_count, which is the total count of all the comments with this article_id. You should make use of queries to the database in order to achieve this.
In addition:

the articles should be sorted by date in descending order.
there should not be a body property present on any of the article objects.
Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint.
*/