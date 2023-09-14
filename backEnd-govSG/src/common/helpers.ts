import bcrypt from 'bcrypt'
import { StatusCode } from '../enums/statusCode'

export const getKeyStatusName = (value: number): string | undefined => {
  const key = Object.keys(StatusCode).find((k) => (StatusCode as unknown as Record<string, number>)[k] === value)

  return key
}

export const encryptPassword = (value: string): string => {
  return bcrypt.hashSync(value, bcrypt.genSaltSync(10))
}

export const checkPassword = async (value: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(value, hash)
}
