import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Welcome from './Welcome/Welcome'
import Store from './Store/Store'
import App from '../App'
import { gamesLoader } from './Discover/Discover.loader'
import Discover from './Discover/Discover'
import ShowGame from './GameOverview/GameOverview'
import { loader as singleGameLoader } from './GameOverview/GameOverviewLoader'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Welcome /> },
        {
          path: 'store',
          element: <Store />,
          children: [
            { index: true, element: <Discover />, loader: gamesLoader },
            // { path: 'browse', element: <BrowseStore /> }
            {
              path: 'games/:gameId',
              element: <ShowGame />,
              loader: singleGameLoader
            }
          ]
        }
      ],
      errorElement: <ErrorPage />
    }
    // {
    //   path: 'games/:gameId'
    // }
  ])

  return <RouterProvider router={router} />
}

export default Router
