const express = require('express')
const app = express()
const {getTopics, getDocumentation} = require('./controllers/index.controllers')

app.get('/api/topics', getTopics)

app.get('/api', getDocumentation)

app.all('*', (request, response) => {
    response.status(404).send({msg: "Sorry, the endpoint you are searching for does not exist."})
})

module.exports = app;