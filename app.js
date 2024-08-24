const express = require('express')
const app = express()
const {getTopics, getDocumentation, getArticle} = require('./controllers/index.controllers')

app.get('/api/topics', getTopics)

app.get('/api', getDocumentation)

app.get('/api/articles/:article_id', getArticle)

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