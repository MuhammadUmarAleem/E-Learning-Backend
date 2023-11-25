const { connection } = require("../../utils/database");

async function getProfile(req, response) {
  const id = req.query.id;
  connection.query(`SELECT * FROM users WHERE Id=${id}`, (err, res) => {
    if (err) throw err;
    else {
      return response.status(200).json({ data: res });
    }
  });
}

module.exports = {
  getProfile,
};
