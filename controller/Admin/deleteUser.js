const { connection } = require("../../utils/database");
const strftime = require("strftime");

async function DeleteUser(req, response) {
  const now = new Date();
  const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);
  connection.query(
    `SELECT * from users WHERE Id=${req.query.id}`,
    (err, res) => {
      if (err) throw err;
      else {
        connection.query(
          "INSERT INTO user_audit (userid, action, oldValue, newValue,dated) VALUES (?, ?, ?, ?,?)",
          [
            req.query.id,
            "DELETE",
            JSON.stringify({ user: res[0] }),
            "N/A",
            dateCreated,
          ],
          (err, auditResult) => {
            if (err) {
              console.error("Error adding audit trail:", err);
              return;
            } else {
              connection.query(
                `DELETE from users WHERE id=${req.query.id}`,
                (err, res) => {
                  if (err) throw err;
                  else {
                    return response.status(200).json({ message: "deleted" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}

module.exports = {
  DeleteUser,
};
