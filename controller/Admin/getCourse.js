const { connection } = require("../../utils/database");

async function GetInventory(req, response) {
  connection.query(
    "SELECT course.id, course.name,course.image, course.price,course.description,instructor.instructorName,course.createdAt,course.updatedAt,course.active from course JOIN instructor on instructor.id=course.instructorid",
    (err, res) => {
      if (err) throw err;
      else {
        return response.status(200).json({ data: res });
      }
    }
  );
}

module.exports = {
  GetInventory,
};
