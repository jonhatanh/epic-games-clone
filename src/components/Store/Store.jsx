import { Link } from 'react-router-dom'
import exampleImg from '../../assets/exampleImage.avif'
import classes from './Store.module.css'

const Store = () => {
  return (
    <div>
      {/* Nav store */}
      <nav className={classes.nav}>
        <input
          type='search'
          name='search'
          id='search'

          placeholder='Search store'
          className={classes.searchBar}
        />
        <Link className={classes.link} to='discover'>
          Discover
        </Link>
        <Link className={classes.link} to='browse'>
          Browse
        </Link>
      </nav>
      <section>{/* <img src={exampleImg} alt="" /> */}</section>
    </div>
  )
}

export default Store
