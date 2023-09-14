import axios from 'axios'
import { Agency, GovUserProfile, PostAccount, PostRegister, UserProfile } from '../types/auth'

export interface Response {
  status: string;
  errors: string[];
}

export interface LoginResponse extends Response {
  status: string;
  token: string;
  data: UserProfile
}

interface ProfileResponse extends Response {
  status: string;
  data: UserProfile
}

interface AuthResponse {
  status: string | number;
  data: GovUserProfile
}

export const loginService = (postAccount: PostAccount): Promise<LoginResponse> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_GOVSG_API}/user/login`,
    data: postAccount
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const profileService = (token: string): Promise<ProfileResponse> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SURVEY_API}/user/profile`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const agencyService = (): Promise<Agency[]> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_SURVEY_API}/agency`
  })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const registerService = (token:string, postRegister: PostRegister): Promise<Response> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_SURVEY_API}/user/register`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: postRegister
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const authService = (token: string): Promise<AuthResponse> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_GOVSG_API}/user/auth`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}

export const logoutService = (token: string): Promise<Response> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_GOVSG_API}/user/logout`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      const { status, data } = error.response
      return {
        status,
        errors: data.errors
      }
    })
}
