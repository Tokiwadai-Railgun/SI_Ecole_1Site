import { verifyToken } from "$lib/jwt"
import { redirect } from "@sveltejs/kit"

export function load({cookies}) {
    if (cookies.get('accessToken'))  {
        console.log(cookies.get('accessToken'))
        const token: null|object = verifyToken(cookies.get('accessToken'))
        throw redirect(303, "/")
    }
}
