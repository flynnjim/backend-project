const {selectTopics} = require('../models/select-topics.model.js')

exports.getTopics = (request, response) => {
    console.log("Hello")
    selectTopics()
        .then((data) => {
            response.status(200).send()
        })
}