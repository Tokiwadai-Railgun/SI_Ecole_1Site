
import { goto } from "$app/navigation"
import { verifyToken } from "$lib/jwt"
import type { jwt } from "$lib/types"
import { redirect } from "@sveltejs/kit"

export function load({cookies}) {
  if (cookies.get('accessToken'))  {
    console.log(cookies.get('accessToken'))
    const token: null|jwt= verifyToken(cookies.get('accessToken'))
    console.log(token)
    if (token != null && Date.now() > token.exp) {
      console.log(Date.now)
      return redirect(303, "/tableau-de-bord")
    } 
    else {
      console.log("Invalid Token")
      throw redirect(303, "/login")
    }
  }
}
