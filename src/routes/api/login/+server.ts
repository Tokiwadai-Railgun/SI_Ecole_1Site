import { json } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import { generateToken } from "$lib/jwt";
import { mysqlconFn } from "$lib/mysql";
import { verifyToken } from "$lib/jwt";

export async function POST({request, cookies}) {
  const {username, password} = await request.json();
  console.log("Username : " + username)
  console.log("Password : " + password)
  if (cookies.get('accessToken'))  {
      const token: null|object = verifyToken(cookies.get('accessToken'))

      if (token) return {accessToken: cookies.get('accessToken')}
  }

  console.log(cookies.get('accessToken'))

  const mysqlconn = await mysqlconFn();

  try {
    const result = await mysqlconn.query("SELECT authentication.person_id, password, role FROM authentication JOIN person ON authentication.person_id = person.person_id WHERE authentication.email='" + username + "';").then(function ([rows]) {
        return rows;
    })
    // now that we have email and password check if they match database data

    const count = Object.keys(result).length;
    if (count == 0) throw error(404, "User not found")
    if (count > 1) throw error(500, "Internal server error")

    // TODO: Get the user role from the person table
    console.log("login role", result[0])
    if (result[0].password != password) return json('Password does not match', {status: 401})

    const token = generateToken(result[0].person_id, result[0].role)
    return json(token, {status: 201});
  } catch(err) {
      console.error("Error fetching data")
      console.log(err)
      return json('User not found', {status: 404});
  }

}

