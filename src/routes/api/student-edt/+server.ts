import { mysqlconFn } from '$lib/mysql';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
  const mysqlconn = await mysqlconFn();
  const studentId = url.searchParams.get("userId")
  const startDate = url.searchParams.get("startDate")
  const endDate = url.searchParams.get('endDate')

  if (!studentId || !startDate || !endDate) throw error(400, "Missing informations")

  const query = `select cours.topic AS 'cours', date, teacher_name, class.topic AS 'className', period from cours
    JOIN class ON cours.class_id = class.class_id JOIN teacher ON cours.teacher_id = teacher.teacher_id
    JOIN course_date on cours_id = course_id AND cours.class_id
    JOIN student ON student.class_id = class.class_id
    WHERE date >= '${startDate}' AND date <= '${endDate}' AND student.student_id = ${studentId};`;

  try {
    let result = await mysqlconn.query(query).then(function ([rows, fields]) {
      return rows;
    })

    return json(result)
  }
  catch(err) {
    console.error("Error fetching datas")
    console.log(err)
    throw error(500, "Internale server Error")
  }
}
