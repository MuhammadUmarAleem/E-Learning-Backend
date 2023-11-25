const { connection } = require("../../utils/database");

async function enrollmentReport(req, response) {
  connection.query("SELECT  C.name as CourseName, I.instructorName as InstructorName, U.username as Student, C.price as Price ,E.dated as Dated from enroll E JOin  course C on C.id = E.course_id join instructor I ON C.instructorId = I.id Join users U On U.id = E.user_id ", (err, res) => {
    if (err) throw err;
    else {
        console.log(res);
        // res.send(res);
      return response.status(200).json({ data: res });
    }
  });
}

module.exports = {
    enrollmentReport,
};



