import { mysqlconFn } from '$lib/mysql';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
  const mysqlconn = await mysqlconFn();
  const teacherId = url.searchParams.get("userId")
  const startDate = url.searchParams.get("startDate")
  const endDate = url.searchParams.get('endDate')

  if (!teacherId || !startDate || !endDate) throw error(400, "Missing informations")

  const query = `select cours.topic AS 'cours', date, teacher_name, class.topic AS 'className' from cours
    JOIN class ON cours.class_id = class.class_id JOIN teacher ON cours.teacher_id = teacher.teacher_id
    JOIN course_date on cours_id = course_id AND cours.class_id
    WHERE date >= '${startDate}' AND date <= '${endDate}' AND teacher.teacher_id = ${teacherId};`;

  try {
    let result = await mysqlconn.query(query).then(function ([rows, fields]) {
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
