import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import classes from './Welcome.module.css'
import { faCodeFork } from '@fortawesome/free-solid-svg-icons'

const Welcome = () => {
  return (
    <section className={classes.container}>
      <h2>Welcome Everyone!</h2>
      <p>
        This project is an assignment from{' '}
        <a
          className={classes.odin}
          href='https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart'
        >
          The Odin Project ⚡
        </a>
        .
      </p>
      <p>
        The purpose of this project is to learn React Router and deepen our
        understanding of React in general.
      </p>
      <p>
        Initially, I aimed to create a simple game store, drawing inspiration
        from the
        <a href='https://store.epicgames.com/'> Epic Games UI</a> However, as I
        progressed, I ended up building an Epic Games Clone 😁.
      </p>
      <p>
        Feel free to explore my project and 'purchase' some games for free 😊.
      </p>
      <Button link to='store' bgColor='blue'>
        Go to Store
      </Button>
      <footer>
        <a
          className={classes.link}
          href='https://github.com/jonhatanh'
          target='_blank' rel='noreferrer'
        >
          My GitHub <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          className={classes.link}
          href='https://github.com/jonhatanh/epic-games-clone'
          target='_blank' rel='noreferrer'
        >
          GitHub Repo <FontAwesomeIcon icon={faCodeFork} />
        </a>
      </footer>
    </section>
  )
}

export default Welcome
