import { NextFunction, Request, Response } from 'express'
import { getKeyStatusName } from '../common/helpers'
import { StatusCode } from '../enums/statusCode'
import { secureAuth } from '../services/govSG/auth'

export const govSgAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const userGov = await secureAuth(req.headers.authorization.split(' ')[1])
      res.locals.userGov = userGov
    }
    next()
  } catch (error: any) {
    const status = StatusCode.forbidden
    res.status(status).json({
      status: getKeyStatusName(status),
      errors: error.message
    })
  }
}
