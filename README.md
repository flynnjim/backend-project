# Northcoders News API

## Hosted on Supabase and Render

### [View API](https://backend-project-fmoa.onrender.com)

NC News is a RESTful API built to provide data programmatically for a front-end application. This API serves news articles, users, topics, and comments. It allows users to interact with this data by posting comments, deleting comments, and updating articles. The backend is built with PostgreSQL and Node.js, using the Express framework.

## **Endpoints**

- `GET /api`  
   Responds with a JSON object of available endpoints.

- `GET /api/topics`  
   Responds with a list of all topics.  
   example Response:  
   ``` json
    {
      "topics":
      [
        { 
        "slug": "football", "description": "Footie!"
         }
        ]
    }
- `GET /api/articles`  
   Responds with a list of all articles. Supports sorting and filtering by queries:

  - sort_by (default: created_at)
  - order (default: DESC)
  - topic (filters articles by topic)  
    example Response:

  ```json
    {
      "articles": [
        {
          "title": "Seafood substitutions are       increasing",
          "topic": "cooking",
          "author": "weegembump",
          "body": "Text from the article..",
          "created_at": "2018-05-30T15:59:13.341Z",
          "votes": 0,
          "comment_count": 6
        }
      ]
    }
- `GET /api/articles/:article_id`  
   Responds with a single article by article_id, including the comment_count.  
   Example Response:
  ```json
  {
      "articles": [
        {
          "title": "Seafood substitutions are increasing",
          "topic": "cooking",
          "author": "weegembump",
          "body": "Text from the article..",
          "created_at": "2018-05-30T15:59:13.341Z",
          "votes": 0,
          "comment_count": 6
        }
      ]
    }
- `GET /api/articles/:article_id/comments`  
   Responds with a list of comments for the specified article.  
   example Response:  
    ``` json
    {
      "comments": [
        {
          "body": "h, I've got compassion running out of my nose..",
          "votes": 16,
          "author": "butter_bridge",
          "article_id": 9,
          "created_at": "2018-05-30T15:59:13.341Z"
        }
      ]
    }
- `POST /api/articles/:article_id/comments`  
   Adds a new comment to the specified article.
  Requires a request body containing username and body.  
  example Response:  
    ``` json
    {
        "comment": [
            {
            "body": "I hate streaming noses",
            "votes": 0,
            "author": "icellusedkars",
            "article_id": 1,
            "created_at": "2018-05-30T15:59:13.341Z"
            }
        ]
        }
- `PATCH /api/articles/:article_id`  
   Updates an article's vote property by article_id.  
   Requires a request body specifying the fields to update (inc_votes).  
   example Response:  
    ``` json
    {
      "comment": [
        {
          "article_id": 1,
          "title": "Living in the shadow of a great man",
          "topic": "mitch",
          "author": "butter_bridge",
          "body": "I find this existence challenging",
          "created_at": "2020-07-09T20:11:00.000Z",
          "votes": 110,
          "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        }
      ]
    }
- `DELETE /api/comments/:comment_id`  
   Deletes a comment by its comment_id.  
   example Response:  
    ``` json
    {}
- `GET /api/users`  
   Responds with a list of all users.  
   example Response:  
    ``` json
    {
      "users": [
        {
          "username": "butter_bridge",
          "name": "jonny",
          "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
        }
      ]
    }
## **Installation**

1. **Clone the repository**
   ```bash
    git clone https://github.com/northcoders/be-nc-news.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Scripts**

   - "setup-dbs": "psql -f ./db/setup.sql"
   - "seed": "node ./db/seeds/run-seed.js"
   - "test": "jest"
   - "prepare": "husky install"
   - "start": "node listen.js"
   - "seed-prod": "NODE_ENV=production npm run seed"

4. **Create .env files**  
   To connect to the databases locally, you need two .env files:

- .env.development:
  ```makefile
  PGDATABASE=nc_news  
- .env.test:
  ```makefile
  PGDATABASE=nc_news_test  
5. **Setup the database**  
   To create the necessary databases, run:
   ```bash
   npm run setup-dbs  
These files should point to your local PostgreSQL databases for development and testing environments.

6. **Seed the database**  
   Populate the development database with initial data by running:
   ```bash
   npm run seed  
Ensure that the database is correctly seeded before running any tests.

7. **Run the Server**  
   Start the application locally with:
   ```bash
   npm start  
This will start the Express server on your local machine.

8. **Run tests**  
   To run the test suite and verify the application’s functionality, use:
   ```bash
   npm test  
Tests are run using Jest and Supertest for API endpoint validation.

## **Technologies Used**

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for handling routing and HTTP requests.
- **PostgreSQL**: Relational database for storing data.
- **node-postgres (pg)**: PostgreSQL client for Node.js.
- **Jest & Supertest**: For testing the API endpoints.

## **Database Setup**

To set up PostgreSQL on your system, follow this guide: [Install PostgreSQL](https://www.w3schools.com/postgresql/postgresql_install.php)

## **Dev Dependencies:**

- `"husky": "^9.1.6"`
- `"jest": "^29.7.0"`
- `"jest-extended": "^4.0.2"`
- `"jest-sorted": "^1.0.15"`
- `"supertest": "^7.0.0"`

## **Dependencies**

- `"cors": "^2.8.5"`
- `"dotenv": "^16.4.5"`
- `"express": "^4.19.2"`
- `"pg": "^8.12.0"`

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)