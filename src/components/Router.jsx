import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Welcome from './Welcome/Welcome'
import Store from './Store/Store'
import App from '../App'
import { gamesLoader } from './Store/Store.loader'

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
          loader: gamesLoader,
          // children: [
          //   { index: true, element: <Discover /> },
          //   { path: 'browse', element: <BrowseStore /> }
          // ]
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
