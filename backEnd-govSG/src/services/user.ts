import { Equal } from 'typeorm'
import { User } from '../entities/user'
import dataSource from '../ormConfig'

const userRepository = dataSource.getRepository(User)

export const create = async (createDTO: Partial<User>): Promise<User> => {
  return await userRepository.save(createDTO)
}

export const findById = async (govId: string): Promise<User | null> => {
  return await userRepository.findOne({
    where: {
      govId: Equal(govId)
    }
  })
}

export const findByUsername = async (username: string): Promise<User | null> => {
  return await userRepository.findOne({
    where: {
      username: Equal(username)
    }
  })
}
