const { connection } = require("../../utils/database");

async function GetBrands(req, response) {
  connection.query("SELECT  * from instructor", (err, res) => {
    if (err) throw err;
    else {
      return response.status(200).json({ data: res });
    }
  });
}

module.exports = {
  GetBrands,
};
