import { TRPCError } from "@trpc/server";
import { bcrypt } from "~/server/bcrypt";
import { db } from "~/server/db";
import { type JwtPayload, jwt } from "~/server/jwt";

export const getUserByTokenOrThrowUnauthorizedError = async ({ jwtToken }: { jwtToken: string }) => {

    let tokenInfo: JwtPayload;
    try {
        tokenInfo = await jwt.decodeToken(jwtToken)
    } catch (error) {
        console.log({ error })
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { hashedPassword, userId } = tokenInfo;
    const matchingUserInDb = await db.query.users.findFirst({
        where: ({ id }, { eq }) => eq(id, userId),
    });
    if (!matchingUserInDb) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const matchingUserInDbAuthInfo = await db.query.auth.findFirst({
        where: ({ userId }, { eq }) => eq(userId, userId),
    });
    if (!matchingUserInDbAuthInfo) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return matchingUserInDb
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    // const passwordsMatch = await bcrypt.compare(
    //     matchingUserInDbAuthInfo.hashedPassword,
    //     hashedPassword,
    // );

    // if (!passwordsMatch) {
    //     throw new TRPCError({ code: "UNAUTHORIZED" });
    // }
    // return matchingUserInDb
}