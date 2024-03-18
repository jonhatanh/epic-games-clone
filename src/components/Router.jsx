import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Welcome from '@/views/Welcome/Welcome'
import Store from '@/views/Store/StorePage/Store'
import App from '@/App'
import { loader as DiscoverLoader } from '@/views/Store/views/Discover/DiscoverPage/DiscoverPage.loader'
import { browseLoader } from '@/views/Store/views/Browse/BrowsePage/BrowsePage.loader'
import { loader as genreCatalogueLoader } from '@/views/Store/views/Browse/GenrePage/GenrePage.loader';
import Discover from '@/views/Store/views/Discover/DiscoverPage/DiscoverPage'
import ShowGame from '@/views/Store/views/ShowGame/ShowGamePage/ShowGame'
import { loader as singleGameLoader } from '@/views/Store/views/ShowGame/ShowGamePage/ShowGameLoader'
import GameOverview from '@/views/Store/views/ShowGame/GameOverview/GameOverview'
import GameAchievements from '@/views/Store/views/ShowGame/GameAchievements/GameAchievements'
import BrowsePage from '@/views/Store/views/Browse/BrowsePage/BrowsePage'
import GenrePage from '../views/Store/views/Browse/GenrePage/GenrePage'

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
            { index: true, element: <Discover />, loader: DiscoverLoader },
            {
              id: 'BrowsePage',
              path: 'browse',
              element: <BrowsePage />,
              loader: browseLoader
            },
            {
              id: 'GenrePage',
              path: 'genre/:genreId',
              element: <GenrePage />,
              loader: genreCatalogueLoader
            },
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
                },
              ]
            },
          ]
        },
      ],
      errorElement: <ErrorPage />
    },
    // {
    //   path: 'games/:gameId'
    // }
  ])

  return <RouterProvider router={router} />
}

export default Router
