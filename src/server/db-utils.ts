import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { jwt, type JwtPayload } from "~/server/jwt";
type GetStuffUsingTokenParams = { jwtToken?: string };
export const safelyGetUserOrNullByToken = ({
  jwtToken,
}: GetStuffUsingTokenParams) => {
  try {
    const user = getUserByTokenOrThrowUnauthorizedError({ jwtToken });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserByTokenOrThrowUnauthorizedError = async ({
  jwtToken,
}: GetStuffUsingTokenParams) => {
  if (!jwtToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  let tokenInfo: JwtPayload;
  try {
    tokenInfo = await jwt.decodeToken(jwtToken);
  } catch (error) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { userId } = tokenInfo;
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

  return matchingUserInDb;
};
