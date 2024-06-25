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

  const id = response.sub
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const startDate = `${year}-${month}-${day}`;
  const Date2 = new Date(startDate);
  Date2.setDate(date.getDate() + 7);
  const year2 = date.getFullYear();
  const month2 = String(date.getMonth() + 1).padStart(2, '0');
  const day2 = String(date.getDate()).padStart(2, '0');
  const endDate = `${year2}-${month2}-${day2}`;


  const apiResponse = await fetch('http://localhost:5173/api/user/byId?id='+id)
  const personData = await apiResponse.json()
  const edtResponse = await fetch(`http://localhost:5173/api/student-edt?userId=${id}&startDate=${startDate}&endDate=${endDate}`)
  const edtdata = await edtResponse.json()
  return {role:personData.role, edt:edtdata};
}


