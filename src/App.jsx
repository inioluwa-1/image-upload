import { useState } from 'react'
import './App.css'
import Imageupload from './Components/Imageupload.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Imageupload/>
    </>
  )
}

export default App
