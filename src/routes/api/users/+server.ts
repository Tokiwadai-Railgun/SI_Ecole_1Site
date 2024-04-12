
import { mysqlconFn } from '$lib/mysql';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function GET() {
    const mysqlconn = await mysqlconFn();

    try {
        let result = await mysqlconn.query("SELECT * FROM person").then(function ([rows, fields]) {
            return rows;
        })

        return json(result)
    }
    catch(err) {
        console.error("Error fetching datas")
        console.log(err)
    }
}
