import { Box, Button, Container, Typography, styled } from '@mui/material'
import React from 'react'
import { ViewPage, ViewPageStates } from '../../types/auth'

interface SurveyProps {
  handleViewPage: (page: ViewPage) => void
}

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

const Survey: React.FC<SurveyProps> = ({ handleViewPage }) => {
  return (
    <MainContent>
      <Container maxWidth='md'>
        <Box textAlign='center'>
          <Typography
            variant='h2'
            color='text.warning'
            fontWeight='bold'
            sx={{ my: 2 }}
          >
            Survey Singpapore
          </Typography>
          <Typography
            variant='h4'
            color='text.secondary'
            fontWeight='normal'
            sx={{ mb: 2 }}
          >
            Government Authentication and Authorization
          </Typography>

          <Button
            onClick={() => handleViewPage(ViewPageStates.Login)}
            variant='contained'
            sx={{ ml: 1, width: '60%' }}
          >
            Create your account
          </Button>
          <Typography
            variant='h5'
            color='text.secondary'
            fontWeight='normal'
            sx={{ my: 1 }}
          >
            Powered by: govtech SG
          </Typography>
        </Box>
      </Container>
    </MainContent>
  )
}

export default Survey
