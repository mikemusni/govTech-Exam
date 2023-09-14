import { StatusCode } from '../enums/statusCode'

export const getKeyStatusName = (value: number): string | undefined => {
  const key = Object.keys(StatusCode).find((k) => (StatusCode as unknown as Record<string, number>)[k] === value)

  return key
}
