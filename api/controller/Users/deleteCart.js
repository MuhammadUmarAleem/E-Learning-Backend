const { connection } = require("../../utils/database");

async function deleteCart(req, response) {
  const id = req.query.id;
  connection.query(`DELETE FROM cart WHERE cartId=${id}`, (err, res) => {
    if (err) throw err;
    else {
      return response.status(200).json({ message: "deleted" });
    }
  });
}

module.exports = {
  deleteCart,
};
