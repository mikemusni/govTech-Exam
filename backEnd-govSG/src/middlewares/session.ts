import { NextFunction, Request, Response } from 'express'
import { getKeyStatusName } from '../common/helpers'
import { StatusCode } from '../enums/statusCode'
import * as sessionRepository from '../services/session'

const checkSession = async (token: string, res: Response, next:NextFunction) => {
  const status = StatusCode.forbidden

  try {
    const session = await sessionRepository.auth(token)

    if (session !== null) {
      res.locals.userGov = session.govId
      res.locals.userGovToken = token
      next()
    } else {
      res.status(status).json({
        status: getKeyStatusName(status)
      })
    }
  } catch (error: any) {
    res.status(status).json({
      status: getKeyStatusName(status),
      errors: [error.message]
    })
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''
  await checkSession(token, res, next)
}

export const guard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const securedToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''
  const token = req.body.token

  if (securedToken === process.env.SECURED_TOKEN) {
    await checkSession(token, res, next)
  } else {
    const status = StatusCode.forbidden
    res.status(status).json({
      status: getKeyStatusName(status)
    })
  }
}
