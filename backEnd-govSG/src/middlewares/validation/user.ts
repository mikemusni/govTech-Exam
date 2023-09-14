import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCode } from '../../enums/statusCode'

export const createValidation = async (req: Request, res: Response, next: NextFunction) => {
  const createSchema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
    name: yup.string().required()
  })

  try {
    await createSchema.validate(req.body, { abortEarly: false })
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

export const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const loginSchema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required()
  })

  try {
    await loginSchema.validate(req.body, { abortEarly: false })
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

export const guardValidation = async (req: Request, res: Response, next: NextFunction) => {
  const guardSchema = yup.object().shape({
    token: yup.string().required()
  })

  try {
    await guardSchema.validate(req.body, { abortEarly: false })
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
