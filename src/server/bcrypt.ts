import * as _bcrypt from 'bcrypt'
const saltOrRounds = 10
const compare = _bcrypt.compare
const hashPassword = (password: string) => _bcrypt.hash(password, saltOrRounds)

export const bcrypt = {
    compare,
    hashPassword
}