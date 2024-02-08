import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App () {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>GAME STORE</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
