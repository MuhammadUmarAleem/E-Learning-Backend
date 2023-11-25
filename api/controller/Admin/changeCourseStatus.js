const { connection } = require("../../utils/database");

async function updateInventoryStatus(req, response) {
  const status = req.body.status;
  const id = req.body.id;
  connection.query(
    `UPDATE course SET active=${status} WHERE id=${id}`,
    (err, res) => {
      if (err) throw err;
      else {
        return response.status(200).json({
          message: "updated",
        });
      }
    }
  );
}

module.exports = {
  updateInventoryStatus,
};
