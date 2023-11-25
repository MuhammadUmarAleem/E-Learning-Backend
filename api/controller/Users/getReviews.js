const { connection } = require("../../utils/database");

async function getReviews(req, response) {
  const productId = req.query.id;
  connection.query(
    `SELECT * FROM reviews JOIN users on users.Id=reviews.userId WHERE productId=${productId}`,
    (err, res) => {
      if (err) throw err;
      else {
        return response.status(200).json({ data: res });
      }
    }
  );
}

module.exports = {
  getReviews,
};
