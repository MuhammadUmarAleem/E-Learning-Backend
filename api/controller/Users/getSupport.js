const { connection } = require("../../utils/database");

async function support(req, response) {
  connection.query(`SELECT * FROM support`, (err, res) => {
    if (err) throw err;
    else {
      return response.status(200).json({ data: res });
    }
  });
}

module.exports = {
  support,
};
