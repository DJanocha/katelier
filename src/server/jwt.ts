import _jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '~/env.mjs';

export const jwtPayloadSchema = z.object({
    hashedPassword: z.string(),
    userId: z.number(),
    email: z.string(),
})
export type JwtPayload = z.infer<typeof jwtPayloadSchema>
type F = _jwt.JwtPayload & JwtPayload

async function verifyToken(token: string) {
    return new Promise((resolve, reject) => {
        if (!token) reject({})

        _jwt.verify(token, env.JWT_SECRET, (err, decoded) => err ? reject({ message: "token invalid" }) :
            resolve(decoded))
    }
    );
}

export const decodeToken = async (token: string) => {
    return new Promise<JwtPayload>((resolve, reject) => {
        if (!token) return reject({ message: 'token not found' })

        const decoded = _jwt.decode(token, { complete: true })
        if (!decoded) { reject({ message: 'could not decode token' }) }
        const validationResult = jwtPayloadSchema.safeParse(decoded?.payload)
        if (!validationResult.success) { return reject({ message: 'token-encoded data in unexpected shape', data: decoded?.payload }) }
        resolve(validationResult.data)

    }
    );
}

const jwt = {
    verifyToken,
    decodeToken,
    create: (payload: JwtPayload) => _jwt.sign(payload, env.JWT_SECRET)
}

export { verifyToken, jwt };
