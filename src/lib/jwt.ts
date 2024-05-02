import {SECRET_KEY_TOKEN} from '$env/static/private'
import jwt from "jsonwebtoken"

export function generateToken(person_id) {
    const currentTimestamp = Date.now();
    const expirationTimestamp = currentTimestamp + (8 * 60 * 60 * 1000);
    return jwt.sign({ username: person_id, sub: person_id, exp: expirationTimestamp, iat: currentTimestamp}, SECRET_KEY_TOKEN);
}

export function verifyToken(token: string) {
    jwt.verify(token, SECRET_KEY_TOKEN, function(err, decoded) {
        if (err) {
            console.log(err)
            return null
        }

        return decoded
    })
}
