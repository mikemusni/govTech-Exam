import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCode } from '../../enums/statusCode'

export const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
  const registerSchema = yup.object().shape({
    username: yup.string().email(),
    agency: yup.string().required(),
    description: yup.string().required()
  })

  try {
    await registerSchema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(StatusCode.badRequest).json({
        status: error.name,
        errors: error.errors
      })
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
