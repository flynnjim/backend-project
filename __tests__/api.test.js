const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')


beforeEach(() => seed(testData))

afterAll(() => db.end())

describe("News API BACKEND PROJECT", () => {
    describe("GET /api/topics that returns all topics", () => {
        //get all topics
        //an array of topic objects, each of which have properties of:
        //slug
        // description
        test('returns a 200 response status', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
        })
    })
})