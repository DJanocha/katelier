import _jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '~/env.mjs';

export const jwtPayloadSchema = z.object({
    hashedPassword: z.string(),
    userId: z.number()
})
export type JwtPayload = z.infer<typeof jwtPayloadSchema>

async function verifyToken(token: string) {
    return new Promise((resolve, reject) => {
        if (!token) reject({})

        _jwt.verify(token, env.JWT_SECRET, (err, decoded) => err ? reject({}) :
            resolve(decoded))
    }
    );
}

export const decodeToken = async (token: string) => {
    return new Promise<JwtPayload>((resolve, reject) => {
        if (!token) return reject(null)

        const decoded = _jwt.decode(token, { complete: true })
        if (!decoded) { reject(null) }
        const validationResult = jwtPayloadSchema.safeParse(decoded?.payload)
        if (!validationResult.success) { return reject(null) }
        resolve(validationResult.data)

    }
    );
}

const jwt = {
    verifyToken,
    decodeToken,
    create: ({ userId }: { userId: number }) => _jwt.sign({ userId }, env.JWT_SECRET)
}

export { verifyToken, jwt };
