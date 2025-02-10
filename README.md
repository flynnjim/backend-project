# Northcoders News API

## Hosted on Supabase and Render

### [View API](https://backend-project-fmoa.onrender.com)

## **Table of Contents**

- [Introduction](#introduction)
- [Endpoints and Example Responses](#endpoints-and-example-responses)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Database Setup](#database-setup)
- [Dev Dependencies](#dev-dependencies)
- [Dependencies](#dependencies)
- [Hosting with Supabase and Render](#hosting-with-supabase-and-render)
  - [Set up Supabase Database](#set-up-supabase-database)
  - [Set Up a Production Environment Variable](#set-up-a-production-environment-variable)
  - [Update the Connection Pool](#update-the-connection-pool)
  - [Configure Production Database](#configure-production-database)
  - [Add a Listen File](#add-a-listen-file)
  - [Update the package.json](#update-the-packagejson)
  - [Seed the Online Database](#seed-the-online-database)
  - [Host the API on Render](#host-the-api-on-render)

## Introduction

NC News is a RESTful API built to provide data programmatically for a front-end application. This API serves news articles, users, topics, and comments. It allows users to interact with this data by posting comments, deleting comments, and updating articles. The backend is built with PostgreSQL and Node.js, using the Express framework.

## **Endpoints and Example Responses**

- `GET /api`  
   Responds with a JSON object of available endpoints.

- `GET /api/topics`  
   Responds with a list of all topics.  
   example Response:
  ```json
  {
    "topics": [
      {
        "slug": "football",
        "description": "Footie!"
      }
    ]
  }
  ```
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
  ```

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
  ```
- `GET /api/articles/:article_id/comments`  
   Responds with a list of comments for the specified article.  
   example Response:
  ```json
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
  ```
- `POST /api/articles/:article_id/comments`  
   Adds a new comment to the specified article.
  Requires a request body containing username and body.  
  example Response:
  ```json
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
  ```
- `PATCH /api/articles/:article_id`  
   Updates an article's vote property by article_id.  
   Requires a request body specifying the fields to update (inc_votes).  
   example Response:
  ```json
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
  ```
- `DELETE /api/comments/:comment_id`  
   Deletes a comment by its comment_id.  
   example Response:
  ```json
  {}
  ```
- `GET /api/users`  
   Responds with a list of all users.  
   example Response:
  ```json
  {
    "users": [
      {
        "username": "butter_bridge",
        "name": "jonny",
        "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
      }
    ]
  }
  ```

## **Installation**

1. **Clone the repository**
   ```bash
    git clone https://github.com/flynnjim/backend-project
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
  ```
- .env.test:
  ```makefile
  PGDATABASE=nc_news_test
  ```

5. **Setup the database**  
    To create the necessary databases, run:

   ```bash
   npm run setup-dbs
   These files should point to your local PostgreSQL databases for development and testing environments.

   ```

6. **Seed the database**  
    Populate the development database with initial data by running:

   ```bash
   npm run seed
   Ensure that the database is correctly seeded before running any tests.

   ```

7. **Run the Server**  
    Start the application locally with:

   ```bash
   npm start
   This will start the Express server on your local machine.

   ```

8. **Run tests**  
    To run the test suite and verify the application’s functionality, use:
   ```bash
   npm test
   Tests are run using Jest and Supertest for API endpoint validation.
   ```

## **Technologies Used**

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for handling routing and HTTP requests.
- **PostgreSQL**: Relational database for storing data.
- **node-postgres (pg)**: PostgreSQL client for Node.js.
- **Jest & Supertest**: For testing the API endpoints.

## **Database Setup**

To set up PostgreSQL on your system, follow this guide: [Install PostgreSQL](https://www.w3schools.com/postgresql/postgresql_install.php)

## **Dev Dependencies**

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

## **Hosting with Supabase and Render**

### Set Up a Database Instance with Supabase

1. **Create a Supabase Account**: Sign up with email or GitHub.
2. **Create a Project**: After logging in, click the '+ New Project' button.
3. **Configure the Project**: Choose a project name, create a database password, and select the region.
4. **Copy Database Connection String**: In your project, go to `Connect`, copy the connection string (e.g., `postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`).

### Set Up a Production Environment Variable

1. **Create .env.production**: In your project repo, create `.env.production` and add the `DATABASE_URL` variable using the copied connection string.

   ```js
   DATABASE_URL =
     "postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres";
   ```

2. **Update .gitignore**: Add `.env.production` to `.gitignore` to keep the database URL private.

### Update the Connection Pool

1. **Assign Environment Variable**: In the database connection file (`connection.js`), ensure the `NODE_ENV` is assigned to `const ENV = process.env.NODE_ENV || "development"` :

   ```js
   const ENV = process.env.NODE_ENV || "development";
   ```

2. **Handle Missing Variables**: Check that either `PGDATABASE` or `DATABASE_URL` exists:

   ```js
   if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
     throw new Error("PGDATABASE or DATABASE_URL not set");
   }
   ```

### Configure Production Database

Add a config for production:

```js
const config = {};
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}
module.exports = new Pool(config);
```

### Add a Listen File

Ensure there is a listen.js file to allow hosting provider to start up the server:

```js
const ENV = process.env.NODE_ENV || "development";
```

### Update the package.json

In package.json, ensure main key set to listen.js.

```js
"main": "listen.js"
```

add these scripts for "start" and "seed-prod"

```js
{
"scripts": {
 "start": "node listen.js",
 "seed-prod": "NODE_ENV=production npm run seed"
}
}
```

### Seed the Online Database

Run the seed-prod script"

```bash
npm run seed-prod
```

This script will check whether the app is in a production environment and, if so, connect to the production database.
Navigate to **Table Editor** in **Supabase** to view the database tables.

### Host the API on Render

1. **Sign up to Render**: Go to [Render](https://render.com/) and sign up for an account.
2. **Create a New Web Service**: Click on the "New +" button to create a new Web Service.
3. **Connect GitHub**: Render allows you to connect your GitHub account and give permission to access your app’s repository. Alternatively, you can paste the URL of the public Git repository.
4. **Set Environment Variables**:
   - Provide the following environment variables:
     - `DATABASE_URL`: Set this to the Supabase database URL (the same as in your `.env.production` file).
     - `NODE_ENV`: Set this to `production`.
5. **Create and Deploy**: Click "Create" to begin the deploy process. The initial deployment might take a few minutes.
6. **Access the API**: Once deployed, Render will provide a link to the hosted application at the top of the page.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Development provided by [Northcoders](https://northcoders.com/)
