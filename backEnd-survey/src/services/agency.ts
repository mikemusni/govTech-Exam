import { Agency } from '../entities/agency'
import dataSource from '../ormConfig'

const agencyRepository = dataSource.getRepository(Agency)

export const getAll = async (): Promise<Agency[]> => {
  return await agencyRepository.find()
}
