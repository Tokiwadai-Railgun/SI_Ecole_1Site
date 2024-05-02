import { json } from "@sveltejs/kit";
import { generateToken } from "$lib/jwt";
import { mysqlconFn } from "$lib/mysql";

export async function POST({request, cookies}) {
    const {username, password} = await request.json();
    console.log("Username : " + username)
    console.log("Password : " + password)
    if (cookies.get('accessToken'))  {
        const token: null|object = verifyToken(cookies.get('accessToken'))

        if (token) return cookies.get('accessToken')
    }

    console.log(cookies.get('accessToken'))

    const mysqlconn = await mysqlconFn();

    try {
        const result = await mysqlconn.query("SELECT person_id, password FROM authentication WHERE email='" + username + "';").then(function ([rows]) {
            console.log(rows)
            return rows;
        })
        // now that we have email and password check if they match database data

        const count = Object.keys(result).length;
        if (count == 0) throw new Error(412, "No identity found, please contacy your server admin for further informations")
        if (count > 1) throw new Error(500, "Multiple identity found, please contact your server admin for further informations")

        console.log(result[0].password)
        if (result[0].password != password) return json('Password does not match', {status: 402})

        const token = generateToken(username)
        return json(token, {status: 201});
    } catch(err) {
        console.error("Error fetching data")
        console.log(err)
        return json('Data not found', {status: 402});
    }

}

