
exports.getDocumentation = (request, response) => {
    const documentation = require('../endpoints.json')
    response.status(200).send(documentation)
}