import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setLocalStorage } from '../common/helpers'
import { LoginResponse, agencyService, loginService, profileService, registerService } from '../services/api'
import { Agency, PostAccount, PostRegister, ResponseState, StorageKeys, ViewPage, ViewPageStates } from '../types/auth'

const Hooks = () => {
  const [viewPage, setViewPage] = useState<ViewPage>(ViewPageStates.Home)
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const clearErrors = () => {
    setErrors([])
  }

  const handleViewPage = useCallback((page: ViewPage) => {
    setViewPage(page)
  }, [])

  const govProfile = useCallback(async (token: string): Promise<boolean> => {
    const userProfile = await profileService(token)

      if (userProfile.status === ResponseState.Success) {
        setLocalStorage(StorageKeys.UserProfile, userProfile.data)
        return true
      }
      return false
  }, [])

  const handleLogin = useCallback(async (PostAccount: PostAccount) => {
    const loginResult: LoginResponse = await loginService(PostAccount)

    // if error, display alert on page.
    if (loginResult.status !== ResponseState.Success) {
      setErrors(loginResult.errors)
    } else {
      clearErrors()

      // if success, save token to local storage.
      const token = loginResult.token
      setLocalStorage(StorageKeys.Auth, {
        token,
        userProfile: loginResult.data
      })

      // make api call to check if user has a profile in survey SG.
      // if yes, proceed to profile.
      // if not, display registration page.
      if (await govProfile(token)) {
        navigate('/profile', { replace: true })
      } else {
        setViewPage(ViewPageStates.Register)
      }
    }
  }, [])

  const handleRegister = async (token: string, postRegister: PostRegister) => {
    const registration = await registerService(token, postRegister)

    if (registration.status !== ResponseState.Created) {
      setErrors(registration.errors)
    } else {
      clearErrors()
      setLocalStorage(StorageKeys.UserProfile, registration)

      if (await govProfile(token)) {
        navigate('/profile', { replace: true })
      }
    }
  }

  const getAgency = (): Promise<Agency[]> => {
    return agencyService()
  }

  return {
    errors,
    viewPage,
    clearErrors,
    handleViewPage,
    handleLogin,
    handleRegister,
    getAgency,
    govProfile
  }
}

export default Hooks
