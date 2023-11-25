const jwt = require("jsonwebtoken");
const strftime = require("strftime");
const { connection } = require("../../utils/database");

async function AddInventory(req, response) {
  const name = req.body.name;
  const image = req.file.filename;
  const price = req.body.price;
  const stock = req.body.stock;
  const description = req.body.description;
  const brand = req.body.brand;
  const now = new Date();
  const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

  connection.query(
    `SELECT * FROM instructor WHERE instructorName='${brand}'`,
    (err, res) => {
      if (err) throw err;
      else {
        const data = {
          name: name,
          price: price,
          description: description,
          image: image,
          instructorId: res[0].id,
          createdAt: dateCreated,
          updatedAt: dateCreated,
          active: true,
        };

        connection.query("INSERT INTO course SET ?", data, (err, res) => {
          if (err) throw err;
          else {
            const audit = {
              userId: 2,
              action: "INSERT",
              oldValue: "N/A",
              newValue: JSON.stringify(data),
              dated: dateCreated,
            };
            connection.query(
              "INSERT INTO course_audit SET ?",
              audit,
              (err, res) => {
                if (err) throw err;
                else {
                  return response.status(200).json({ message: "added" });
                }
              }
            );
          }
        });
      }
    }
  );
}

module.exports = {
  AddInventory,
};
