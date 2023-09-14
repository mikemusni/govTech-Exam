import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { getLocalStorage } from '../../common/helpers'
import {
  Agency,
  PostRegister,
  StorageKeys,
  UserAuthStorage,
  ViewPage,
  ViewPageStates
} from '../../types/auth'
import AlertMessage from '../Alert'

interface RegisterProps {
  handleViewPage: (page: ViewPage) => void
  handleRegister: (token: string, postRegister: PostRegister) => void
  getAgency: () => Promise<Agency[]>
  errors: string[]
  clearErrors: () => void
}

const Register: React.FC<RegisterProps> = ({
  errors,
  clearErrors,
  handleViewPage,
  handleRegister,
  getAgency
}) => {
  const storage: UserAuthStorage | null = getLocalStorage(StorageKeys.Auth)
  const [listAgency, setListAgency] = useState<Agency[]>([])
  const [isCheck, setIsCheck] = useState(false)
  const [post, setPost] = useState<PostRegister>({
    username: (storage?.userProfile.username as string) || '',
    name: (storage?.userProfile.name as string) || '',
    agency: '',
    description: '',
    tnc: true
  })

  useEffect(() => {
    clearErrors()
    getAgency().then((value) => {
      setListAgency(value)
    })
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

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(event.target.checked)
  }

  const register = () => {
    setPost({
      ...post,
      tnc: isCheck
    })

    if (isCheck) {
      handleRegister(storage?.token as string, post)
    }
  }

  const agencies = listAgency.map((agency: Agency, key: number) => {
    return (
      <MenuItem key={key} value={agency.id}>
        {agency.name}
      </MenuItem>
    )
  })

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ ml: 1, mb: 1, width: '96%' }} justifyContent='center'>
            <Typography variant='h2' fontWeight='bold' sx={{ mb: 1 }}>
              Create account
            </Typography>
            <Typography variant='h5' fontWeight='normal' sx={{ mb: 2 }}>
              Fill in the fields below to sign up for an account.
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth sx={{ ml: 1, mb: 2, width: '96%' }}>
              <TextField
                required
                label='Name'
                name='name'
                value={post.name}
                disabled
              />
            </FormControl>
            <FormControl fullWidth sx={{ ml: 1, mb: 2, width: '96%' }}>
              <TextField
                required
                label='E-mail'
                name='username'
                value={post.username}
                onChange={(e) => handleTextFieldChange(e)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ ml: 1, mb: 2, width: '96%' }}>
              <TextField
                required
                label='Agency'
                select
                name='agency'
                value={post.agency}
                onChange={(e) => handleTextFieldChange(e)}
              >
                {listAgency.length ? agencies : <MenuItem></MenuItem>}
              </TextField>
            </FormControl>
            <FormControl fullWidth sx={{ ml: 1, mb: 2, width: '96%' }}>
              <TextField
                required
                label='Officer job Description'
                multiline
                rows={4}
                name='description'
                onChange={(e) => handleTextFieldChange(e)}
              />
            </FormControl>
            <FormControlLabel
              sx={{ ml: 0.1 }}
              control={
                <Checkbox
                  checked={isCheck}
                  onChange={(e) => handleCheckBox(e)}
                />
              }
              label='I accept the terms and conditions.'
            />
          </Box>
          <Box>
            <Button
              variant='contained'
              sx={{ ml: 1, mt: 3, width: '96%' }}
              onClick={() => register()}
            >
              Create your account
            </Button>
          </Box>
          <Box sx={{ mt: 1, mb: 2 }}>
            {errors.length > 0
              ? errors.map((message, key) => {
                  return <AlertMessage key={key} message={message} />
                })
              : ''}
            {!post.tnc && (
              <AlertMessage
                message={'You must agree to our terms and condition.'}
              />
            )}
          </Box>
          <Box sx={{ ml: 1 }}>
            <Typography variant='h5' fontWeight='bold' sx={{ mb: 4 }}>
              Already have an account?
              <Button
                color='secondary'
                sx={{ color: '#f87251' }}
                onClick={() => handleViewPage(ViewPageStates.Login)}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register
