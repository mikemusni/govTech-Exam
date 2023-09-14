import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../common/helpers'
import { authService } from '../services/api'
import { StorageKeys, UserAuthStorage } from '../types/auth'

const Protected: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const storage: UserAuthStorage | null = getLocalStorage(StorageKeys.Auth)

    if (storage === null) {
      navigate('/', { replace: true })
    } else {
      authService(storage?.token as string).then((auth) => {
        if (auth.status === 403) {
          navigate('/', { replace: true })
        }
      })
    }
  }, [])

  return <Outlet />
}

export default Protected
