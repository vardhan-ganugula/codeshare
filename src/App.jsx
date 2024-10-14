import {Route, Routes} from 'react-router-dom'
import {Homepage} from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route Component={Homepage} path='/' />
        <Route Component={Homepage} path='/create' />
        <Route Component={Homepage} path='/view' />
      </Routes>
    </>
  )
}

export default App
