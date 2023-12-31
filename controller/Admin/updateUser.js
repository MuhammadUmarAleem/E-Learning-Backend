const strftime = require("strftime");
const { connection } = require("../../utils/database");

async function UpdateUser(req, response) {
  const username = req.body.username;
  const email = req.body.email;
  const id = req.query.id;
  const now = new Date();
  const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

  let oldUsername = "";
  let oldEmail = "";

  connection.query(`SELECT * FROM users WHERE Id=${id}`, (err, res) => {
    if (err) throw err;
    else {
      oldUsername = res[0].username;
      oldEmail = res[0].email;
      connection.query(
        `SELECT * FROM users WHERE email='${email}' and Id<>${id}`,
        (err, res) => {
          if (err) throw err;
          else {
            if (res.length == 0) {
              connection.query(
                `UPDATE users SET username='${username}',email='${email}',updatedAt='${dateCreated}' WHERE id=${id}`,
                (err, res) => {
                  if (err) throw err;
                  else {
                    connection.query(
                      "INSERT INTO user_audit (userid, action, oldValue, newValue,dated) VALUES (?, ?, ?, ?,?)",
                      [
                        id,
                        "UPDATE",
                        JSON.stringify({
                          username: oldUsername,
                          email: oldEmail,
                        }),
                        JSON.stringify({ username: username, email: email }),
                        dateCreated,
                      ],
                      (err, auditResult) => {
                        if (err) {
                          console.error("Error adding audit trail:", err);
                          return;
                        } else {
                          response.status(200).json({ message: "updated" });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              response.status(200).json({ message: "already" });
            }
          }
        }
      );
    }
  });
}

module.exports = {
  UpdateUser,
};
