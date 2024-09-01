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
                const objectKeys = Object.keys(body.article)
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
    })
    describe("GET /api/articles returns all articles", () =>{
        test("returns a 200 response status", () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
        })
        test("returns a an array of length 13 with object with expected properties for original data", () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                expect(body.length).toBe(13)
                body.forEach((article) => {

                    const objectKeys = Object.keys(article)
                    expect(objectKeys.includes("author")).toBe(true)
                    expect(objectKeys.includes("title")).toBe(true)
                    expect(objectKeys.includes("article_id")).toBe(true)
                    expect(objectKeys.includes("topic")).toBe(true)
                    expect(objectKeys.includes("created_at")).toBe(true)
                    expect(objectKeys.includes("votes")).toBe(true)
                    expect(objectKeys.includes("article_img_url")).toBe(true)
                }) 
            })
        })
        test("returns a an array of length 13 with object with expected properties with body removed and comment_count added", () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                expect(body.length).toBe(13)
                body.forEach((article) => {

                    const objectKeys = Object.keys(article)
                    expect(objectKeys.includes("author")).toBe(true)
                    expect(objectKeys.includes("title")).toBe(true)
                    expect(objectKeys.includes("article_id")).toBe(true)
                    expect(objectKeys.includes("topic")).toBe(true)
                    expect(objectKeys.includes("created_at")).toBe(true)
                    expect(objectKeys.includes("votes")).toBe(true)
                    expect(objectKeys.includes("article_img_url")).toBe(true)
                    expect(objectKeys.includes("comment_count")).toBe(true)
                    expect(objectKeys.includes("body")).toBe(false)
                }) 
            })
        })
        test("returns an array of length 13 with object with expected properties with body removed and comment_count added with correct number for comment count", () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                expect(body.length).toBe(13)
                body.forEach((article) => {

                    const objectKeys = Object.keys(article)
                    expect(objectKeys.includes("author")).toBe(true)
                    expect(objectKeys.includes("title")).toBe(true)
                    expect(objectKeys.includes("article_id")).toBe(true)
                    expect(objectKeys.includes("topic")).toBe(true)
                    expect(objectKeys.includes("created_at")).toBe(true)
                    expect(objectKeys.includes("votes")).toBe(true)
                    expect(objectKeys.includes("article_img_url")).toBe(true)
                    expect(objectKeys.includes("comment_count")).toBe(true)
                    expect(objectKeys.includes("body")).toBe(false)
                    if (article.article_id === 1) {
                        expect(article.comment_count).toBe(11)
                    }
                }) 
            })
        })
        test("returns an array of values sorted by date descending", () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body).toBeSortedBy('created_at', {'descending': true})
            })
        })
        test("returns a 404 if wrong api url is entered", () => {
            return request(app)
            .get('/api/articlees')
            .expect(404)
            .then((response) => {
                const { body } = response
                expect(body.msg).toBe("Sorry, the endpoint you are searching for does not exist.")
            })
        })

    })
    describe("GET /api/articles/:article_id/comments", () =>{
        test("returns a 200 status code", () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
        })
        test("returns a comments based on passed article id", () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body.length === 11).toBe(true)
                body.forEach((comment) => {
                    const objectKeys = Object.keys(comment)
                    expect(objectKeys.includes("comment_id")).toBe(true)
                    expect(objectKeys.includes("votes")).toBe(true)
                    expect(objectKeys.includes("created_at")).toBe(true)
                    expect(objectKeys.includes("author")).toBe(true)
                    expect(objectKeys.includes("body")).toBe(true)
                    expect(objectKeys.includes("article_id")).toBe(true)
                })
            })
        })
        test("returns comments sorted by age descending", () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body).toBeSortedBy('created_at', {'descending': true})
            })
        })
        test("returns a 400 Bad request when parameter is invalid", () => {
            return request(app)
            .get('/api/articles/one/comments')
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
            })
        })
        test("returns a 404 not found when parameter is out of article_id range", () => {
            return request(app)
            .get('/api/articles/999/comments')
            .expect(404)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Comments not found"})
            })
        })
    })

    describe("POST /api/articles/:article_id/comments", () => {
        test("returns a 201 status code", () => {
            const body = {
                author: "butter_bridge",
                body: "I want more noise!"
            }
            return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(201)
        })
        test("returns a object with commented added", () => {
            const body = {
                author: "butter_bridge",
                body: "I want more noise!"
            }
            return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(201)
            .then((response) => {
                const { body } = response
                const objectKeys = Object.keys(body[0])
                expect(body.length).toBe(1)
                expect(objectKeys.includes("author")).toBe(true)
                expect(objectKeys.includes("body")).toBe(true)
                expect(objectKeys.includes("comment_id")).toBe(true)
                expect(objectKeys.includes("created_at")).toBe(true)
                expect(objectKeys.includes("votes")).toBe(true)
                expect(body[0].article_id).toBe(1)
            })
        })
        test("returns a 400 if body contains username corresponding entry", () => {
            const body = {
                author: "butter_tower",
                body: "I want more noise!"
            }
            return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
            })
        })
        test("returns a 400 if body contains article_id without corresponding entry", () => {
            const body = {
                author: "butter_bridge",
                body: "I want more noise!"
            }
            return request(app)
            .post('/api/articles/999/comments')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
            })
        })
        test("returns a 400 if body is not in correct format", () => {
            const body = {
                writer: "butter_tower",
                text: "I want more noise!",
                other: "I enjoyed this!"
            }
            return request(app)
            .post('/api/articles/1/comments')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
            })
        })
        test("returns a 400 when passed article_id with incorrect format", () => {
            const body = {
                author: "butter_bridge",
                body: "I want more noise!"
            }
            return request(app)
            .post('/api/articles/one/comments')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"}) 
            })
        })
    })
    describe("PATCH /api/articles/:article_id", () => {
        test("returns a 200 status code", () => {
            const body = { inc_votes: 10 }
            return request(app)
            .patch('/api/articles/1')
            .send(body)
            .expect(200)
        })
        test("returns an article object with vote incremented by passed body", () => {
            const body = { inc_votes: 10 }
            return request(app)
            .patch('/api/articles/1')
            .send(body)
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body.length).toBe(1)
                expect(body[0].votes).toBe(110)
            })
        })
        test("returns a 404 when no article is found", () => {
            const body = { inc_votes: 10 }
            return request(app)
            .patch('/api/articles/999')
            .send(body)
            .expect(404)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Article not found"})
        })
        })
        test("returns a 400 response status if passed invalid body object", () => {
            const body = { inc_boats: 10,
                            inc_floats: 1 }
            return request(app)
            .patch('/api/articles/1')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
            })
        })
        test("returns a 400 when inc_votes is not a number", () => {
            const body = { inc_votes: "ten" }
            return request(app)
            .patch('/api/articles/1')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
        })
        })
        test("returns a 400 when article_id is not a number", () => {
            const body = { inc_votes: 10 }
            return request(app)
            .patch('/api/articles/one')
            .send(body)
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: "Bad request"})
             })
        })

    })
    describe("DELETE /api/comments/:comment_id", () => {
        test("returns a 204 status code and returns nothing - body is empty object", () => {
            return request(app)
            .delete('/api/comments/1')
            .expect(204)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({})
            })
        })
        test('returns a 400 Bad request when comment_id is invalid data type', () => {
            return request(app)
            .delete('/api/comments/one')
            .expect(400)
            .then((response) => {

                const { body } = response
                expect(body).toEqual({msg: 'Invalid data format'})
            })
        })
        test('returns a 404 comment not found when no comment with comment_id', () => {
            return request(app)
            .delete('/api/comments/999')
            .expect(404)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: 'Comment not found'})
            })
        })
    })
    describe("GET /api/users", () => {
        test('returns a 200 response status and data with correct properties', () => {
            return request(app)
            .get('/api/users')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                body.forEach((topic) => {
                    expect(topic).toHaveProperty("username")
                    expect(topic).toHaveProperty("name")
                    expect(topic).toHaveProperty("avatar_url")
                })
            })
        })
    })
    describe("GET /api/articles sorting queries", () => {
        test("default sorting by created date and descending", () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body).toBeSortedBy("created_at", {descending:true})
            })
        })
        test("sorts by passed sort query: topic", () => {
            return request(app)
            .get('/api/articles?sort_by=topic')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body).toBeSortedBy("topic", {descending:true})
            })
        })
        test("sorts by passed sort query: votes", () => {
            return request(app)
            .get('/api/articles?sort_by=votes')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body).toBeSortedBy("votes", {descending:true})
            })
        })
        test("sorts by passed sort query: votes and chosen order:ascending", () => {
            return request(app)
            .get('/api/articles?sort_by=votes&&order=ASC')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body).toBeSortedBy("votes", {ascending:true})
            })
        })
        test("returns a 400 Bad request if send an invalid sort query", () => {
            return request(app)
            .get('/api/articles?sort_by=boats')
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: 'Invalid sorting query'})
            })
        })
        test("returns a 400 Bad request if sent an invalid sort order", () => {
            return request(app)
            .get('/api/articles?order=ascending')
            .expect(400)
            .then((response) => {
                const { body } = response
                expect(body).toEqual({msg: 'Invalid sorting order'})
            })
        })
    })
    describe("GET /api/articles topic query", () => {
        test("returns 200 status code and returns only articles with topic specified", () => {
            return request(app)
            .get('/api/articles?topic_query=cats')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(Array.isArray(body)).toBe(true)
                body.forEach((article) => {
                    expect(article.topic).toBe("cats")
                })
        })
    })
        test("returns 404 when no topic is found", () => {
            return request(app)
                .get('/api/articles?topic_query=bats')
                .expect(404)
                .then((response) => {
                    const { body } = response
                    expect(body.msg).toBe("Article not found")
                })
    })

    })
    describe("GET /api/articles/article_id comment_count", () => {
        test("returns a 200 status and returned body contains comment_count", () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then((response) => {
                const { body } = response
                expect(body.article).toHaveProperty("comment_count")
                expect(body.article.comment_count).toBe(11)
            })
        })
    })
})