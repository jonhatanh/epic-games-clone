import { Link, useRouteError } from 'react-router-dom'
import classes from './ErrorPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

type ErrorType = {
  data?: string
  statusText?: string
  message?: string
}
export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)

  const errorMessage = (error as ErrorType)?.data ?? 'Sorry, an unexpected error has occurred.'
  const errorStatusText = (error as ErrorType)?.statusText || (error as ErrorType)?.message

  return (
    <div className={classes.errorContainer} id='error-page'>
      <h1>Oops!</h1>
      <p>{errorMessage}</p>
      <p className={classes.statusText}>
        <i>{errorStatusText}</i>
      </p>
      <Link to='/'>Go to home page <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
  )
}
