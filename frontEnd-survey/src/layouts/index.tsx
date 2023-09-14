import { Box, Container, Grid, Hidden, Typography, styled } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.orange1};
`
)

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

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[100]};
`
)

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
)

const BaseLayout: React.FC = () => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems='stretch'
          spacing={0}
        >
          <Hidden mdDown>
            <GridWrapper
              xs={12}
              md={4}
              alignItems='center'
              display='flex'
              justifyContent='center'
              item
            >
              <Container maxWidth='sm'>
                <Box textAlign='center'>
                  <img
                    alt='500'
                    height={100}
                    src='https://blog.nus.edu.sg/computingcareerfair/files/formidable/40/GovTechSg-True-Inline-Logo-5-Orange-ae7581.png'
                  />
                </Box>
                <Box textAlign='center'>
                  <TypographyPrimary variant='h3' sx={{ my: 1 }}>
                    Government Technology Agency
                  </TypographyPrimary>
                  <TypographySecondary
                    variant='h4'
                    fontWeight='normal'
                    sx={{ mb: 4 }}
                  >
                    A statutory board of the Government of Singapore under the
                    Prime Minister&apos;s Office.
                  </TypographySecondary>
                </Box>
              </Container>
            </GridWrapper>
          </Hidden>
          <Grid
            xs={12}
            md={8}
            alignItems='center'
            display='flex'
            justifyContent='center'
            item
          >
            <Outlet />
          </Grid>
        </Grid>
      </MainContent>
    </Box>
  )
}

export default BaseLayout
