import { User } from '../entities/user'

export interface RegisterResponse {
  status: string | undefined
  errors?: string[]
}

export interface ProfileResponse {
  status: string | undefined
  data?: User
  errors?: string[]
}

export interface SecureAuthResponse {
  status: string
  data: {
      govId: string
      username: string
      name: string
  }
}
