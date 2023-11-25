const { connection } = require("../../utils/database");

async function addtoCart(req, response) {
  const productId = req.body.productId;
  const userId = req.body.userId;
  const quantity = req.body.quantity;

  connection.query(
    `SELECT * from cart WHERE userId=${userId} and productId=${productId}`,
    (err, res) => {
      if (err) throw err;
      else {
        if (res.length == 0) {
          const data = {
            productId: productId,
            userId: userId,
            quantity: quantity,
          };

          connection.query(`INSERT into cart SET ? `, data, (err, res) => {
            if (err) throw err;
            else {
              return response.status(200).json({ message: "added" });
            }
          });
        } else {
          return response.status(200).json({ message: "already" });
        }
      }
    }
  );
}

module.exports = {
  addtoCart,
};
