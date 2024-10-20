const db = require('../db/connection');

exports.selectAllArticles = (query) => {
    const { sort_by, order, topic_query } = query;

    const sortingOrder = order ? order : "DESC";
    const sortingQuery = sort_by && sort_by !== 'comment_count' ? sort_by : 'created_at';

    let baseString = `SELECT * FROM articles`;

    if (topic_query) {
        baseString += ` WHERE topic = '${topic_query}'`;
    }

    baseString += ` ORDER BY ${sortingQuery} ${sortingOrder}`;

    let articlesRowsData;

    return db.query(baseString)
        .then((articlesData) => {
            articlesRowsData = articlesData.rows;

            if (articlesRowsData.length === 0) {
                return Promise.reject({ status: 404, msg: "Article not found" });
            }

            articlesRowsData.forEach((article) => {
                delete article.body;
                article.comment_count = 0;
            });

            return db.query('SELECT * FROM comments');
        })
        .then((comments) => {
            const commentsData = comments.rows;
            commentsData.forEach((comment) => {
                articlesRowsData.forEach((article) => {
                    if (article.article_id === comment.article_id) {
                        article.comment_count++;
                    }
                });
            });
            
            if (sort_by === 'comment_count') {
                articlesRowsData.sort((a, b) => {
                    return sortingOrder === 'ASC' ? a.comment_count - b.comment_count : b.comment_count - a.comment_count;
                });
            }

            return articlesRowsData;
        });
};
