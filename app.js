const express = require('express')
const app = express()
const {getTopics, getDocumentation, getArticle} = require('./controllers/index.controllers')

app.get('/api/topics', getTopics)

app.get('/api', getDocumentation)

app.get('/api/articles/:article_id', getArticle)

app.all('*', (request, response) => {
    response.status(404).send({msg: "Sorry, the endpoint you are searching for does not exist."})
})

/*

CORE: GET /api/articles/:article_id
Description
Should:

be available on /api/articles/:article_id.
get an article by its id.
Responds with:

an article object, which should have the following properties:
author
title
article_id
body
topic
created_at
votes
article_img_url
Consider what errors could occur with this endpoint, and make sure to test for them.

Remember to add a description of this endpoint to your /api endpoint.

*/

module.exports = app;