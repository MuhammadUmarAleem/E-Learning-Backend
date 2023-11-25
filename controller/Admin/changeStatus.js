const { connection } = require("../../utils/database");

async function UpdateStatus(req, response) {
  const status = req.body.status;
  console.log(status);
  const id = req.body.id;
  connection.query(
    `UPDATE instructor SET active=${status} WHERE Id=${id}`,
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
  UpdateStatus,
};
