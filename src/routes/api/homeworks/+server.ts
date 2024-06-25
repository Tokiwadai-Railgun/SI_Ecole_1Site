import { mysqlconFn } from '$lib/mysql';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
  const mysqlconn = await mysqlconFn();
  const userId = url.searchParams.get("userId")

  if (!userId) throw error(400, "userId needed")

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
