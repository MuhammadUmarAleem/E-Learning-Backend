const { connection } = require("../../utils/database");

async function updateAdmin(req, response) {
  console.log(req.body);
  const name = req.body.username;
  const email = req.body.email;

  connection.query(
    `UPDATE users SET username='${name}',email='${email}' WHERE id=2`,
    (err, res) => {
      if (err) throw err;
      else {
        return response.status(200).json({ message: "updated" });
      }
    }
  );
}

module.exports = {
  updateAdmin,
};
