const express = require('express')
const app = express()
app.use(express.json());
const {getTopics, getDocumentation, getArticle, getAllArticles, getArticleComments, postComment, patchArticle, deleteComment, getUsers} = require('./controllers/index.controllers')

app.get('/api/topics', getTopics)

app.get('/api', getDocumentation)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)

app.get('/api/users', getUsers)

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
    if (err.status === 404) {
        response.status(status).send({msg})
    }
    next(err)
})

app.use((err, request, response, next) => {
    if (err.code === "22P02") {
        response.status(400).send({msg: "Bad request"})
    }
})


app.use((err, request, response, next) => {
    const {status, msg} = err
    response.status(500).send({err})
})

module.exports = app;
