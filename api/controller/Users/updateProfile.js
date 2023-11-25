const jwt = require("jsonwebtoken");
const strftime = require("strftime");
const crypto = require("crypto");
const { connection } = require("../../utils/database");

async function updateProfile(req, response) {
  const username = req.body.username;
  const email = req.body.email;
  const id = req.body.id;
  const now = new Date();
  const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);
  let user = {};

  connection.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
    if (err) throw err;
    else {
      user = res[0];
      if (req.body.password == "") {
        connection.query(
          `UPDATE users SET username='${username}',email='${email}',updatedAt='${dateCreated}' WHERE id=${id}`,
          (err, res) => {
            if (err) throw err;
            else {
              connection.query(
                "INSERT INTO user_audit (userid, action, oldValue, newValue,dated) VALUES (?, ?, ?, ?,?)",
                [
                  user.id,
                  "UPDATE",
                  JSON.stringify(user),
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
      } else if (req.body.password != "") {
        const password = crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("hex");
        connection.query(
          `UPDATE users SET username='${username}',email='${email}',password='${password}',updatedAt='${dateCreated}' WHERE id=${id}`,
          (err, res) => {
            if (err) throw err;
            else {
              connection.query(
                "INSERT INTO user_audit (userid, action, oldValue, newValue,dated) VALUES (?, ?, ?, ?,?)",
                [
                  user.id,
                  "UPDATE",
                  JSON.stringify(user),
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
      }
    }
  });
}

module.exports = {
  updateProfile,
};
