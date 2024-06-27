import { verifyToken } from "$lib/jwt"
import { mysqlconFn } from "$lib/mysql"
import { error, json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ url, cookies }) => {
  const accessToken = cookies.get("accessToken")
  if(!accessToken || !verifyToken(accessToken)) throw error(401, 'Unauthorized action')

  const userId = url.searchParams.get("userId")

  try {
    const mysqlConn = await mysqlconFn()
    const result = await mysqlConn.query("SELECT class.class_id, class.topic, class.class_name FROM class JOIN person_classes on class.class_id = person_classes.class_id WHERE person_id ="+ userId).then(function ([rows]) {
        return rows
      });

    return json(result)
  } catch(err) {
    console.log("Error occured while retriveing data : ", err)
    throw error(500, "Internal server error")
  }
}
