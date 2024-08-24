const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')


beforeEach(() => seed(testData))

afterAll(() => db.end())

describe("News API BACKEND PROJECT", () => {
    describe("GET /api/topics that returns all topics", () => {

        test('returns a 200 response status', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
        })
        test('returns a 200 response status and data with correct properties', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                body.forEach((topic) => {
                    expect(topic).toHaveProperty("slug")
                    expect(topic).toHaveProperty("description")
                })
            })
        })
        test('returns a 404 response status if sent invalid address with appropriate error message', () => {
            return request(app)
            .get('/api/topicks')
            .expect(404)
            .then((response) => {
                const { body } = response
                expect(body.msg).toBe("Sorry, the endpoint you are searching for does not exist.")
            })
        })
    })
    describe("GET /api that returns documentation of available api endpoints", () => {

        test('returns a 200 response status', () => {
            return request(app)
            .get('/api')
            .expect(200)
        })
        test('returns a documentation with the expected properties', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(typeof body).toBe("object")
                const objectKeys = Object.keys(body)
                expect(objectKeys.includes("GET /api")).toBe(true)
                expect(objectKeys.includes("GET /api/topics")).toBe(true)
                expect(objectKeys.includes("GET /api/articles")).toBe(true)
            })
        })
    })
    describe("GET /api/articles/:article_id that returns article with passed article id", () => {
        test("returns a 200 response status", () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
        })
        test("returns a an array of length 1 with object with expected properties", () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                expect(body.length).toBe(1)
                const objectKeys = Object.keys(body[0])
                expect(objectKeys.includes("author")).toBe(true)
                expect(objectKeys.includes("title")).toBe(true)
                expect(objectKeys.includes("article_id")).toBe(true)
                expect(objectKeys.includes("body")).toBe(true)
                expect(objectKeys.includes("topic")).toBe(true)
                expect(objectKeys.includes("created_at")).toBe(true)
                expect(objectKeys.includes("votes")).toBe(true)
                expect(objectKeys.includes("article_img_url")).toBe(true)
            })
        })
        test("returns a 400 Bad request when parameter is invalid", () => {
            return request(app)
            .get('/api/articles/first')
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
            })
        })
        test("returns a 404 not found when parameter is out of article_id range", () => {
            return request(app)
            .get('/api/articles/999')
            .expect(404)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Article not found"})
            })
        })
        // wrong data type and out of range
    })
})