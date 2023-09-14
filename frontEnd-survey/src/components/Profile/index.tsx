import LockOpenTwoTone from '@mui/icons-material/LockOpenTwoTone'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../../common/helpers'
import { logoutService } from '../../services/api'
import { StorageKeys, UserAuthStorage, UserProfile } from '../../types/auth'

const Profile: React.FC = () => {
  const storage: UserProfile | null = getLocalStorage(StorageKeys.UserProfile)
  const storageAuth: UserAuthStorage | null = getLocalStorage(StorageKeys.Auth)
  const [profile, setProfile] = useState<UserProfile>()
  const navigate = useNavigate()

  useEffect(() => {
    if (storage) {
      setProfile(storage)
    }
  }, [])

  const logOut = () => {
    logoutService(storageAuth?.token as string)
    navigate('/', { replace: true })
  }

  return (
    <Grid container spacing={3} justifyContent={'center'}>
      <Grid item lg={8} md={10} xs={11}>
        <Card>
          <Box
            p={3}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box>
              <Typography variant='h4' gutterBottom>
                User Profile
              </Typography>
              <Typography variant='subtitle2'>
                Welcome to govtech survey protected page
              </Typography>
            </Box>
            <Button
              variant='contained'
              startIcon={<LockOpenTwoTone />}
              onClick={() => logOut()}
            >
              Logout
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 3 }}>
            <Typography variant='subtitle2'>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={1}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography variant='subtitle1'>
                    <b>{profile?.name}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={1}>
                    E-mail:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography variant='subtitle1'>
                    <b>{profile?.email}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={1}>
                    Agency:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Typography variant='subtitle1'>
                      <b>{profile?.agencyId.name}</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={1}>
                    Description:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Typography variant='subtitle1'>
                      <b>{profile?.description}</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={1}>
                    Created:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Typography variant='subtitle1'>
                      <b>{profile?.created}</b>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Profile
