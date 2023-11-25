const { connection } = require("../../utils/database");
const strftime = require("strftime");

async function givereview(req, response) {
  const rating = req.body.rating;
  const userId = req.body.userId;
  const review = req.body.review;
  const productId = req.body.productId;
  const now = new Date();
  const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);
  let orderlength = 0;

  const data = {
    userId: userId,
    productId: productId,
    rating: rating,
    review: review,
    dated: dateCreated,
  };

  connection.query(
    `SELECT * FROM orders WHERE userId=${userId} and productId=${productId}`,
    (err, res) => {
      if (err) throw err;
      else {
        orderlength = res.length;
        connection.query(
          `SELECT * FROM reviews WHERE userId=${userId} and productId=${productId}`,
          (err, res) => {
            if (err) throw err;
            else {
              if (orderlength > res.length) {
                connection.query(
                  "INSERT INTO reviews SET ?",
                  data,
                  (err, res) => {
                    if (err) throw err;
                    else {
                      return response.status(200).json({ message: "added" });
                    }
                  }
                );
              } else {
                return response.status(200).json({ message: "already" });
              }
            }
          }
        );
      }
    }
  );
}

module.exports = {
  givereview,
};
