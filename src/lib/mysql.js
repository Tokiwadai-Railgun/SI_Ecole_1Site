import mysql from "mysql2/promise"
import { DATABASE_PASSWORD } from "$env/static/private"

let mysqlcon = null

export function mysqlconFn() {
    if (!mysqlcon) {
        mysqlcon = mysql.createConnection({
            host: "85.215.156.4",
            user: "aea",
            password: DATABASE_PASSWORD,
            database: "SI_Ecole_1Site"
        })
    }

    return mysqlcon
}
