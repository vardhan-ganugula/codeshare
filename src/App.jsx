import {Route, Routes} from 'react-router-dom'
import {Homepage, ViewCode, CreateCode} from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route Component={Homepage} path='/' />
        <Route Component={CreateCode} path='/create' />
        <Route Component={ViewCode} path='/view' />
      </Routes>
    </>
  )
}

export default App
