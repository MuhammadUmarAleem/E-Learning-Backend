const { connection } = require("../../utils/database");
const strftime = require("strftime");

async function buy(req, response) {
  const courseId = req.query.courseId;
  const userId = req.query.userId;
  const price = req.query.price;
  const now = new Date();
  const dateCreated = strftime("%Y-%m-%d %H:%M:%S", now);

  const data = {
    course_id: courseId,
    user_id: userId,
    price: price,
    dated: dateCreated,
  };

  connection.query("INSERT into enroll SET ?", data, (err, res) => {
    if (err) throw err;
    else {
      response.redirect("http://localhost:3000/success");
    }
  });
}

module.exports = {
  buy,
};
