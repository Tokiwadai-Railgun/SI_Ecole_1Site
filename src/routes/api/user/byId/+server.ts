
import { mysqlconFn } from '$lib/mysql';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET({ url }: RequestEvent) {
    const email : string = url.searchParams.get('id') ?? "null";
    console.log(email)
    const mysqlconn = await mysqlconFn();

    try {
        const result = await mysqlconn.query("SELECT * FROM person WHERE id='" + id + "'").then(function ([rows]) {
            return rows;
        })

        // Checking that there is only one result 
        const count = Object.keys(result).length;
        if (count == 0) throw new Error(412, "No identity found, please contacy your server admin for further informations")
        if (count > 1) throw new Error(500, "Multiple identity found, please contact your server admin for further informations")

        return json(result[0])

    }
    catch(err) {
        console.error("Error fetching datas")
        console.log(err)
    }
}
