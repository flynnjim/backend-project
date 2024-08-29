const { selectAllUsers } = require('../models/select-all-users.model.js')

exports.getUsers = (request, response) => {
    selectAllUsers()
        .then((userData) => {
            response.status(200).send(userData)
        })
        .catch((err) => {
            next(err)
        })
}