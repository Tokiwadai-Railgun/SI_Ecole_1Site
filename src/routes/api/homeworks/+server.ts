import { verifyToken } from '$lib/jwt';
import { mysqlconFn } from '$lib/mysql';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export async function GET({ url }) {
  const mysqlconn = await mysqlconFn();
  const userId = url.searchParams.get("userId")

  if (!userId) throw error(400, "Missing parameter")

  const query = "SELECT title, description, files, end_date, teacher_id FROM homework, student WHERE student.class_id = homework.class_id AND student.user_id =" + userId

  console.log(userId)


  try {
    let result = await mysqlconn.query(query).then(function ([rows, fields]) {
      console.log(rows[0].end_date)
      return rows;
    })

    return json(result)
  }
  catch(err) {
    console.error("Error fetching datas")
    console.log(err)
    throw error(404, "User not found")
  }
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  // First verify if the user is logged in and is a teacher
  const accessToken = cookies.get("accessToken")
  if(!accessToken || !verifyToken(accessToken) || verifyToken(accessToken).role != 'teacher') throw error(401, 'Unauthorized action')

  const userId = verifyToken(accessToken).sub
  const { title, description, classId, endDate } = await request.json()

  // first query to confirm that the teacher have the right to add this assignment
  try {
    const mysqlConn = await mysqlconFn()
    const confirmationResult = await mysqlConn.query("SELECT class.class_id FROM class JOIN person_classes on class.class_id = person_classes.class_id WHERE person_id").then(function ([rows]) {
        return rows
    })

    let authorized = false
    for (let query_class_id of confirmationResult) {
      if (query_class_id = classId) authorized = true; break;
    }

    // if all is right then get the teacher_id
    const teacherIdResult = await mysqlConn.query("SELECT teacher.teacher_id FROM teacher JOIN employee ON teacher.empl_id = employee.empl_id WHERE employee.user_id ="+userId ).then(function([rows]) { return rows[0]})

    // third query to add the homework
    const addQuery = `INSERT INTO homework (title, description, files, end_date, class_id, teacher_id) VALUES (
    '${title}',
    '${description}',
    '',
    '${endDate}',
    '${classId}',
    '${teacherIdResult.teacher_id}'
)`
    const addResponse = await mysqlConn.query(addQuery).then(function ([rows]) { 
        return new Response(JSON.stringify({ message: "Course Planned"}), {
        status: 200,
      });
    })

  return json({})
  } catch(err) {
    console.log("Error occured while retriveing data : ", err)
    throw error(500, "Internal server error")

  }

}
