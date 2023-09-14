import axios, { AxiosResponse } from 'axios'
import { SecureAuthResponse } from '../../types/user'

export const secureAuth = async (userToken: string): Promise<SecureAuthResponse> => {
  return axios({
    method: 'post',
    url: `${process.env.GOV_SG_URL}/user/secure/auth`,
    headers: { Authorization: `Bearer ${process.env.GOV_SG_SECURED_TOKEN}` },
    data: {
      token: userToken
    }
  })
    .then((response: AxiosResponse<SecureAuthResponse>) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
