const { connection } = require("../../utils/database");

async function GetUsers(req, response) {
  connection.query("SELECT  * from users where active = true", (err, res) => {
    if (err) throw err;
    else {
      return response.status(200).json({ data: res });
    }
  });
}

module.exports = {
  GetUsers,
};
