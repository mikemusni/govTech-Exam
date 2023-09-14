/* eslint-disable indent */
/* eslint-disable react/display-name */
import React, { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router'
import SuspenseLoader from '../components/SuspenseLoader'
import BaseLayout from '../layouts'
import Protected from './Protected'

const Loader =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) => (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  )

const Home = Loader(lazy(() => import('../components/Home')))
const Profile = Loader(lazy(() => import('../components/Profile')))
const Error404 = Loader(lazy(() => import('../components/Error/404')))

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/profile',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Protected />,
        children: [
          {
            path: '',
            element: <Profile />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
]

export default routes
