const {selectTopics} = require('../models/select-topics.model.js')

exports.getTopics = (request, response) => {
    selectTopics()
        .then((topicsData) => {
            response.status(200).send(topicsData)
        })
}