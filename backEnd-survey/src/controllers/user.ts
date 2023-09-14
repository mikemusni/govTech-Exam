import { Request, Response } from 'express'
import { getKeyStatusName } from '../common/helpers'
import { User } from '../entities/user'
import { StatusCode } from '../enums/statusCode'
import * as userRepository from '../services/user'
import { ProfileResponse, RegisterResponse } from '../types/user'

export const register = async (req: Request, res: Response): Promise<void> => {
  const userGov = res.locals.userGov

  const registerDTO: Partial<User> = {
    govId: userGov.data.govId,
    email: req.body.username,
    name: userGov.data.name,
    agencyId: req.body.agency,
    description: req.body.description
  }

  let status: number = StatusCode.created
  let responseData: RegisterResponse | undefined

  try {
    if (registerDTO.email === '') {
      registerDTO.email = userGov.data.username
    }

    await userRepository.create(registerDTO)

    responseData = {
      status: getKeyStatusName(status)
    }
  } catch (error: any) {
    status = StatusCode.internalServerError
    responseData = {
      status: getKeyStatusName(status),
      errors: [error.message]
    }
  }

  res.status(status).json(responseData)
}

export const profile = async (req: Request, res: Response): Promise<void> => {
  let status: number = StatusCode.success
  let responseData: ProfileResponse | undefined

  try {
    const userGov = res.locals.userGov
    const user: User | null = await userRepository.profile(userGov.data.govId)

    if (user !== null) {
      responseData = {
        status: getKeyStatusName(status),
        data: user
      }
    } else {
      status = StatusCode.notFound
      responseData = {
        status: getKeyStatusName(status),
        errors: ['User not found']
      }
    }
  } catch (error: any) {
    status = StatusCode.internalServerError
    responseData = {
      status: getKeyStatusName(status),
      errors: [error.message]
    }
  }

  res.status(status).json(responseData)
}
