import { Link, useRouteError } from 'react-router-dom'
import classes from './ErrorPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)

  return (
    <div className={classes.errorContainer} id='error-page'>
      <h1>Oops!</h1>
      <p>{error.data ?? 'Sorry, an unexpected error has occurred.'}</p>
      <p className={classes.statusText}>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go to home page <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
  )
}
