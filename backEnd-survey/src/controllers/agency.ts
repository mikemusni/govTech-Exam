import { Request, Response } from 'express'
import { getKeyStatusName } from '../common/helpers'
import { StatusCode } from '../enums/statusCode'
import * as agencyRepository from '../services/agency'
import { AgencyResponse } from '../types/agency'

export const getAllAgency = async (req: Request, res: Response): Promise<void> => {
  let status: number = StatusCode.success
  let responseData: AgencyResponse | undefined

  try {
    responseData = {
      status: getKeyStatusName(status),
      data: await agencyRepository.getAll()
    }
  } catch (error) {
    status = StatusCode.notFound
    responseData = {
      status: getKeyStatusName(status),
      error
    }
  }

  res.status(status).json(responseData)
}
