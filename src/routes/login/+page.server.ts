import { verifyToken } from "$lib/jwt"
import type { jwt } from "$lib/types"
import { redirect } from "@sveltejs/kit"

export function load({cookies}) {
  if (cookies.get('accessToken'))  {
    console.log(cookies.get('accessToken'))
    const token: null|jwt = verifyToken(cookies.get('accessToken'))
    if (token != null && token.exp > Date.now()) {
      console.log("Valid token")
      throw redirect(303, "/")
    }
  }
}
