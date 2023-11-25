const { connection } = require("../../utils/database");

async function daywiseEnrollmentReport(req, response) {
  connection.query(`
  WITH AllDays AS (
    SELECT 'Monday' AS day_name
    UNION SELECT 'Tuesday'
    UNION SELECT 'Wednesday'
    UNION SELECT 'Thursday'
    UNION SELECT 'Friday'
    UNION SELECT 'Saturday'
    UNION SELECT 'Sunday'
  )
  
  SELECT
    ad.day_name AS Day,
    c.name AS Course,
    COUNT(e.enroll_id) AS Count
  FROM
    AllDays ad
  CROSS JOIN
    course c
  LEFT JOIN
    enroll e ON ad.day_name = DAYNAME(e.dated)
             AND c.id = e.course_id
  GROUP BY
    ad.day_name,
    c.name
  ORDER BY
    c.name;
  `, (err, res) => {
    if (err) throw err;
    else {
        console.log(res);
        // res.send(res);
      return response.status(200).json({ data: res });
    }
  });
}

module.exports = {
    daywiseEnrollmentReport,
};



