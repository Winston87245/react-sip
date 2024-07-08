import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Label, Input } from '../';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button>test</Button>
      <Label>test</Label>
      <Input />
    </>
  )
}

export default App
