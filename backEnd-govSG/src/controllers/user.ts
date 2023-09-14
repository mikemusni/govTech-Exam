import crypto from 'crypto'
import { Request, Response } from 'express'
import { checkPassword, encryptPassword, getKeyStatusName } from '../common/helpers'
import { Session } from '../entities/session'
import { User } from '../entities/user'
import { StatusCode } from '../enums/statusCode'
import * as sessionRepository from '../services/session'
import * as userRepository from '../services/user'
import { createUserResponse } from '../types/user'

export const create = async (req: Request, res: Response): Promise<void> => {
  const createDTO: Partial<User> = {
    username: req.body.username,
    password: encryptPassword(req.body.password),
    name: req.body.name
  }

  let status: number = StatusCode.created
  let responseData: createUserResponse | undefined

  try {
    await userRepository.create(createDTO)
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const loginDTO: Partial<User> = {
    username: req.body.username,
    password: req.body.password
  }

  let status: number = StatusCode.success
  let responseData: createUserResponse | undefined

  try {
    const user: User | null = await userRepository.findByUsername(loginDTO.username as string)

    if (user === null || !await checkPassword(loginDTO.password as string, user.password)) {
      status = StatusCode.forbidden
      responseData = {
        status: getKeyStatusName(status),
        errors: ['Invalid username or password']
      }
    } else {
      // create session
      const sessionDTO: Partial<Session> = {
        govId: user?.govId,
        token: crypto.randomUUID(),
        timeStamp: new Date()
      }
      await sessionRepository.create(sessionDTO)
      responseData = {
        status: getKeyStatusName(status),
        token: sessionDTO.token,
        data: {
          govId: user?.govId,
          username: user?.username,
          name: user?.name
        }
      }
    }
  } catch (error: any) {
    status = StatusCode.forbidden
    responseData = {
      status: getKeyStatusName(status),
      errors: [error.message]
    }
  }

  res.status(status).json(responseData)
}

export const profile = async (_req: Request, res: Response): Promise<void> => {
  let status: number = StatusCode.success
  let responseData: createUserResponse | undefined

  try {
    const user = await userRepository.findById(res.locals.userGov.govId)

    if (user !== null) {
      responseData = {
        status: getKeyStatusName(status),
        data: {
          govId: user.govId,
          username: user.username,
          name: user.name
        }
      }
    } else {
      status = StatusCode.notFound
      responseData = {
        status: getKeyStatusName(StatusCode.notFound)
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

export const logout = async (_req: Request, res: Response): Promise<void> => {
  let status: number = StatusCode.success
  let responseData: createUserResponse | undefined

  try {
    await sessionRepository.remove(res.locals.userGovToken)

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
