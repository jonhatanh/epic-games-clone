import Button from '../Button/Button';
import {container} from './Empty.module.css'
export default function Empty (params) {
  return (
    <div className={container}>
      <h5>Nothing to see here</h5>
      <p>You can see games in the store</p>
      <Button link to='/store' bgColor='blue'>Go to store</Button>
    </div>
  )
}
