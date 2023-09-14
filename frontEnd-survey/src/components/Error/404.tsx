import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
)

const Error404: React.FC = () => {
  return (
    <MainContent>
      <Container maxWidth='md'>
        <Box textAlign='center'>
          <Typography variant='h1' fontWeight='normal' sx={{ my: 2 }}>
            Error 404
          </Typography>
          <img
            alt='404'
            height={300}
            src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
          />
          <Typography variant='h2' fontWeight='normal' sx={{ my: 2 }}>
            Page not found :(
          </Typography>
          <Typography
            variant='h4'
            color='text.secondary'
            fontWeight='normal'
            sx={{ mb: 4 }}
          >
            The requested page could not be found.
          </Typography>
        </Box>
      </Container>
    </MainContent>
  )
}

export default Error404
