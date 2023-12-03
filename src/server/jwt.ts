import * as jose from "jose";
import { z } from "zod";

import { env } from "~/env.mjs";

export const jwtPayloadSchema = z.object({
  hashedPassword: z.string(),
  userId: z.number(),
  email: z.string(),
});
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export async function sign(payload: JwtPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(env.JWT_SECRET));
}

export async function verify(token: string): Promise<JwtPayload> {
  const { payload } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(env.JWT_SECRET),
  );
  const validatedResult = jwtPayloadSchema.parse(payload);
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return validatedResult;
}

export const jwt = {
  decodeToken: (token: string) => verify(token),
  create: (payload: JwtPayload) => sign(payload),
};
