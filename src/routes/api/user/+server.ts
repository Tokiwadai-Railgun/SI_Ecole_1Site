import { mysqlconFn } from '$lib/mysql';
import { fail, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ url }: RequestEvent) {
    const email : string = url.searchParams.get('email') ?? "null";
    console.log(email)
    const mysqlconn = await mysqlconFn();

    try {
        const result = await mysqlconn.query("SELECT person_id FROM person WHERE email='" + email + "'").then(function ([rows]) {
            return rows;
        })

        // Checking that there is only one result 
        const count = Object.keys(result).length;
        if (count == 0) throw error(412, "No identity found, please contacy your server admin for further informations")
        if (count > 1) throw error(500, "Multiple identity found, please contact your server admin for further informations")

        return json(result[0])

    }
    catch(err) {
        console.error("Error fetching datas")
        console.log(err)
    }
}

export async function POST({ url }: RequestEvent) {
    const email = "";
    const first_name = "";
    const last_name = "";
    const phoneNumber = "";
}
