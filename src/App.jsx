import {Route, Routes} from 'react-router-dom'
import {Homepage, ViewCode, CreateCode,EditCode} from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route Component={Homepage} path='/' />
        <Route Component={CreateCode} path='/create' />
        <Route Component={ViewCode} path='/view' />
        <Route Component={EditCode} path='/edit/:code' />
      </Routes>
    </>
  )
}

export default App
