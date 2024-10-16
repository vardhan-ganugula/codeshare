import React, { useState } from 'react'
import {Sidebar, Header, Footer} from '../components'
function ViewCode() {
  const [code, setCode] = useState('this page is created by vardhan')
  const getCode = (textCode)=> {
    setCode(textCode)
  }
  return (
    <>
    <Header />
      <main className='flex gap-2 flex-col md:flex-row min-h-screen shadow'>
        <Sidebar getCode={getCode} />
        <section className='flex-grow p-3 overflow-hidden text-wrap overflow-y-auto h-screen' style={{userSelect: 'text' }}>
          {code}
        </section>
      </main>
    <Footer />
    </>
  )
}

export default ViewCode