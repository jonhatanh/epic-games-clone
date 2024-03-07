import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Welcome from './Welcome/Welcome'
import Store from './Store/Store'
import App from '../App'
import { gamesLoader } from './Discover/Discover.loader'
import Discover from './Discover/Discover'
import ShowGame from './ShowGame/ShowGame'
import { loader as singleGameLoader } from './ShowGame/ShowGameLoader'
import GameOverview from './GameOverview/GameOverview'
import GameAchievements from './GameAchievements/GameAchievements'

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
              id: 'showGame',
              path: 'games/:gameId',
              element: <ShowGame />,
              loader: singleGameLoader,
              children: [
                {
                  index: true,
                  element: <GameOverview />
                },
                {
                  path: 'achievements',
                  element: <GameAchievements />
                }
              ]
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
