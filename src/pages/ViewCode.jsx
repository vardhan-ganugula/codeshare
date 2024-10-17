import React, { useState, useEffect } from 'react'
import {Sidebar, Header, Footer} from '../components'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosProfile from '../utils/axiosProfile'
function ViewCode() {
  const [textInfo, setTextinfo] = useState("Welcome to TextShare.vardhan.works, the easiest way to share text online using unique codes and you can download the text also. Our platform allows you to create pages for text sharing with just a simple code, enabling fast and secure content sharing over the web. On the View page, users can quickly access the shared content by entering their unique code. If no code is entered, you'll see a default placeholder text showcasing how the system works. Whether you’re sharing notes, messages, or important information, TextShare makes it hassle-free and secure.")
  const [textCode, setTextCode] = useState('0000');
  const [time, setTime] = useState(Date.now())

  let { search } = useLocation();
  const navigate = useNavigate();

  async function getText(code) {
    try { 
      const response = await axiosProfile.get('/view-text', {
        params : {
          code
        }
      })
      if(response.data.status === 'success'){
        setTextinfo(response.data.data.textInfo)
        setTime(response.data.data.createdAt)
      }
    } catch (error) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(search);
    let path = query.get("code");
    if (path && (path.length != 4)) {
      toast.error("Not a valid Code");
      toast.info("Redirecting in 3 seconds");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    }
    if (path) {
      setTextCode(path)
      getText(path)
    }
  }, [search]);


  return (
    <>
    <Header />
      <main className='flex gap-2 flex-col md:flex-row h-[87vh] shadow'>
        <Sidebar textCode={textCode} time={time} textInfo={textInfo} />
        <section className='flex-grow p-3 overflow-hidden text-wrap overflow-y-auto h-full' style={{userSelect: 'text' }}>
          {textInfo}
        </section>
      </main>
    <Footer />
    </>
  )
}

export default ViewCode