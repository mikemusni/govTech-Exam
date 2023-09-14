import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { PostAccount } from '../../types/auth'
import AlertMessage from '../Alert'

interface LoginProps {
  handleLogin: (postAccount: PostAccount) => void
  errors: string[]
  clearErrors: () => void
}

const Login: React.FC<LoginProps> = ({ errors, clearErrors, handleLogin }) => {
  const [post, setPost] = useState<PostAccount>({
    username: '',
    password: ''
  })

  useEffect(() => {
    clearErrors()
  }, [])

  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setPost({
        ...post,
        [name]: value
      })
    },
    [post]
  )

  const signIn = useCallback(() => {
    handleLogin(post)
  }, [handleLogin, post])

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ m: 1, width: '96%' }} justifyContent='center'>
            <Typography variant='h2' fontWeight='bold' sx={{ mb: 1 }}>
              Sign in
            </Typography>
            <Typography variant='h5' fontWeight='normal' sx={{ mb: 2 }}>
              Please login to your <b>GovAA</b> account before you can register.
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth sx={{ ml: 1, mb: 2, width: '96%' }}>
              <TextField
                required
                label='Username'
                name='username'
                onChange={(e) => handleTextFieldChange(e)}
                value={post.username}
              />
            </FormControl>
            <FormControl fullWidth sx={{ ml: 1, mb: 2, width: '96%' }}>
              <TextField
                required
                label='Password'
                name='password'
                onChange={(e) => handleTextFieldChange(e)}
                type='password'
                value={post.password}
              />
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button
              onClick={() => signIn()}
              variant='contained'
              sx={{ ml: 1, width: '96%' }}
            >
              Sign in
            </Button>
          </Box>
          <Box>
            {errors.length > 0
              ? errors.map((message, key) => {
                  return <AlertMessage key={key} message={message} />
                })
              : ''}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
