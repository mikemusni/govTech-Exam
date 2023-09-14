import { Equal } from 'typeorm'
import { User } from '../entities/user'
import dataSource from '../ormConfig'

const userRepository = dataSource.getRepository(User)

export const create = async (registerDTO: Partial<User>): Promise<any> => {
  return await userRepository.insert(registerDTO)
}

export const profile = async (govId: string): Promise<User | null> => {
  return await userRepository.findOne({
    where: {
      govId: Equal(govId)
    },
    relations: ['agencyId']
  })
}
