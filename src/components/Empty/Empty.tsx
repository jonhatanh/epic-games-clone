import Button from '../Button/Button';
import styles from './Empty.module.css'
export default function Empty () {
  return (
    <div className={styles.container}>
      <h5>Nothing to see here</h5>
      <p>You can see games in the store</p>
      <Button link to='/store' bgColor='blue'>Go to store</Button>
    </div>
  )
}
