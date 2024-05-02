import {SECRET_KEY_TOKEN} from '$env/static/private'
import jwt from "jsonwebtoken"

export function generateToken(person_id) {
    const currentTimestamp = Date.now();
    const expirationTimestamp = currentTimestamp + (8 * 60 * 60 * 1000);
    return jwt.sign({ sub: person_id, exp: expirationTimestamp, iat: currentTimestamp}, SECRET_KEY_TOKEN);
}

export function verifyToken(token: string) {
    let decoded = jwt.verify(token, SECRET_KEY_TOKEN, function(err, decoded) {
        if (err) {
            console.log(err)
            return null
        }

      return decoded;

    })

  console.log(decoded)
  // Verify for jwt expiration date


  return decoded;
}
