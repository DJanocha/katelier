import { atomWithStorage } from "jotai/utils";

export const JwtTokenStorageKey = 'katelier_jwtToken'
export const jwtTokenAtom = atomWithStorage(JwtTokenStorageKey, '')
