import { Outlet } from 'react-router-dom';
import classes from './Store.module.css';
import StoreNav from '../StoreNav/StoreNav';

const Store = () => {
  return (
    <div className={classes.store}>
      <StoreNav />
      <Outlet />
    </div>
  )
};

export default Store
