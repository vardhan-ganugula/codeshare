import {format} from 'date-fns'
import {QrComponent} from './'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { useLocation, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'



export default function Sidebar({getCode}) {

    const [qrCode, setQrcode] = useState(null);
    let { search } = useLocation();
    const navigate = useNavigate();
    let author = 'vardhan', date = Date.now(), code='0000';
    useEffect(()=> {
        const query = new URLSearchParams(search);
        let path = String(query.get('code'))
        if((path.length != 4)){
            toast.error('Not a valid Code')
            toast.info('Redirecting in 3 seconds')
            setTimeout(()=>{
                navigate('/')
            }, 3000)
            return;
        }
        console.log(path)
        if(!path){
          console.log(path)
        }
        QRCode.toDataURL(window.location.href).then(setQrcode)
    }, [search])


    let codeText = ""

    const generateCode = () => {
    let textBlob = new Blob([codeText], {type : 'text/plain'})
    let fileURL = URL.createObjectURL(textBlob)
    const downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', fileURL)
    downloadElement.setAttribute('download','textShare')
    downloadElement.click()
  }
  return (
    <aside className='md:w-[350px] p-2 md:h-screen border-r-2 border-zinc-100 flex-shrink-0 w-full border-2'>
        <div className='flex flex-col gap-3 bg-white shadow rounded p-2'>
            <div><span className='text-start font-bold text-xl text-indigo-600'>Creater : </span><span>{author}</span>  </div>
            <div><span className='text-start font-bold text-xl text-indigo-600'>Created at : </span><span>{format(date, 'dd-MM-yy')}</span>  </div>
            <div><span className='text-start font-bold text-xl text-indigo-600'>Code : </span><span>{code}</span></div>
        </div>
        <div className='w-full shadow p-2 mt-2'>
            <h1 className='w-full py-3 bg-indigo-500 rounded text-center font-bold text-xl text-white'>Qr Code</h1>
            <QrComponent qrCode={qrCode} />
        </div>
        <div className='w-full p-3 shadow'>
          <button onClick={generateCode} className='w-full text-center py-2 rounded shadow bg-violet-500 text-white'>
            Download Code
          </button>
        </div>
    </aside>
  )
}
