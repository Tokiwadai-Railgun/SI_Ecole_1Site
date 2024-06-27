import { verifyToken } from "$lib/jwt";
import { mysqlconFn } from "$lib/mysql";
import { redirect } from "@sveltejs/kit";
export async function load({ cookies }) {
  const accessToken = cookies.get('accessToken');
  if (!accessToken) {
    throw redirect(307, '/login');
  }
  let response = verifyToken(accessToken)
  if (!response || response == "expired") {
    throw redirect(307, "/login");
  }

  const id = response.sub;
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const startDate = `${year}-${month}-${day}`;
  const Date2 = new Date(startDate);
  Date2.setDate(Date2.getDate() + 7);
  const year2 = Date2.getFullYear();
  const month2 = String(Date2.getMonth() + 1).padStart(2, '0');
  const day2 = String(Date2.getDate()).padStart(2, '0');
  const endDate = `${year2}-${month2}-${day2}`;

  const apiResponse = await fetch('http://localhost:5173/api/user/byId?id='+id)
  const personData = await apiResponse.json()
  const edtResponse = await fetch(`http://localhost:5173/api/teacher-edt?userId=${id}&startDate=2024-06-01&endDate=2024-06-29`)
  const edtdata = await edtResponse.json()
  return {role:personData.role, edt:edtdata};
}