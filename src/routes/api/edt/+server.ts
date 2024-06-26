import { verifyToken } from "$lib/jwt"
import { mysqlconFn } from "$lib/mysql"
import { error, json, type RequestHandler } from "@sveltejs/kit"


export const POST: RequestHandler = async ({ request, cookies }) => {
  // First verify if the user is logged in and is a teacher
  const accessToken = cookies.get("accessToken")
  if(!accessToken || !verifyToken(accessToken) || verifyToken(accessToken).role != 'teacher') throw error(401, 'Unauthorized action')

  const { courseId, date } = await request.json()

  const query = `INSERT INTO course_date (course_id, date) value (
      ${courseId},
      '${date}'
      )`

  try {
    const mysqlConn = await mysqlconFn()
    const result = await mysqlConn.query(query).then(function ([rows]) {
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

export const GET: RequestHandler = async ({url, cookies}) => {
  // First verify if the user is logged in and is a teacher
  const accessToken = cookies.get("accessToken")
  if(!accessToken || !verifyToken(accessToken) || verifyToken(accessToken).role != 'teacher') throw error(401, 'Unauthorized action')

  const userId = url.searchParams.get("userId")

  try {
    const mysqlConn = await mysqlconFn()
    const result = await mysqlConn.query("SELECT cours_id, topic, class_id FROM cours WHERE teacher_id ="+ userId).then(function ([rows]) {
        return rows
      });

    return json(result)
  } catch(err) {
    console.log("Error occured while retriveing data : ", err)
    throw error(500, "Internal server error")

  }
}
