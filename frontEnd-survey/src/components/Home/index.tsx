import { Container } from '@mui/material'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../../common/helpers'
import Hooks from '../../hooks/survey'
import { StorageKeys, UserAuthStorage } from '../../types/auth'
import Login from '../Login'
import Register from '../Register'
import Survey from '../Survey'

const Home: React.FC = () => {
  const {
    errors,
    viewPage,
    clearErrors,
    handleViewPage,
    handleLogin,
    handleRegister,
    getAgency,
    govProfile
  } = Hooks()
  const navigate = useNavigate()

  useMemo(async () => {
    const storage: UserAuthStorage | null = getLocalStorage(StorageKeys.Auth)
    if (await govProfile(storage?.token as string)) {
      navigate('/profile', { replace: true })
    }
  }, [])

  return (
    <Container maxWidth='sm'>
      {viewPage === 'login' && (
        <Login
          handleLogin={handleLogin}
          errors={errors}
          clearErrors={clearErrors}
        />
      )}
      {viewPage === 'register' && (
        <Register
          handleViewPage={handleViewPage}
          handleRegister={handleRegister}
          getAgency={getAgency}
          errors={errors}
          clearErrors={clearErrors}
        />
      )}
      {viewPage === 'home' && <Survey handleViewPage={handleViewPage} />}
    </Container>
  )
}

export default Home
