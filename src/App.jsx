import {Route, Routes} from 'react-router-dom'
import {Homepage, ViewCode, CreateCode,EditCode, CreateGroup} from './pages'
import { Header, Footer } from './components'
import NotFound from './pages/NotFound'
function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route Component={Homepage} path='/' />
        <Route Component={CreateCode} path='/create' />
        <Route Component={CreateGroup} path='/create-group' />
        <Route Component={ViewCode} path='/view' />
        <Route Component={EditCode} path='/edit/:code' />
        <Route Component={EditCode} path='/edit/:code' />
        <Route Component={NotFound} path='*' />
      </Routes>
    <Footer/>
    
    </>

  )
}

export default App
