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

  const apiResponse = await fetch('http://localhost:5173/api/user/byId?id='+id)
  const personData = await apiResponse.json()
  console.log(personData)
  // First check for cookies on user side
  return personData;
}
