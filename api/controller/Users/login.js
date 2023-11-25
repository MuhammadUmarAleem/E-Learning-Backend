const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { connection } = require("../../utils/database");

function GenerateToken(user) {
  const payload = {
    role: user.Role,
    id: user.Id,
  };
  const token = jwt.sign(payload, "123456asdfghjkljasjdhgasdyt6rt2376tuasgd");
  return token;
}

async function Login(req, response) {
  const email = req.body.email;
  const password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  connection.query(
    `SELECT * FROM users WHERE email='${email}' and password='${password}' and role='User' and active = true`,
    (err, res) => {
      if (err) throw err;
      else {
        if (res.length == 0) {
          return response.status(200).json({ message: "invalid" });
        } else {
          var token = GenerateToken(res);
          console.log(res[0].id);
          return response.status(200).json({
            message: "success",
            email: email,
            userid: res[0].id,
            token: token,
          });
        }
      }
    }
  );
}

module.exports = {
  Login,
};
