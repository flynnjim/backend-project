const express = require('express')
const app = express()
const {getTopics} = require('./controllers/get-topics.controller')

app.get('/api/topics', getTopics)

app.all('*', (request, response) => {
    response.status(404).send({msg: "Sorry, the endpoint you are searching for does not exist."})
})

module.exports = app;