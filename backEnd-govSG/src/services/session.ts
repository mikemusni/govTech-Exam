import { Equal } from 'typeorm'
import { Session } from '../entities/session'
import dataSource from '../ormConfig'

const sessionRepository = dataSource.getRepository(Session)

export const create = async (createDTO: Partial<Session>): Promise<Session> => {
  return await sessionRepository.save(createDTO)
}

export const auth = async (token: string) => {
  return await sessionRepository.findOne({
    where: {
      token: Equal(token)
    },
    relations: ['govId']
  })
}

export const remove = async (token: string) => {
  return await sessionRepository.delete({
    token
  })
}
