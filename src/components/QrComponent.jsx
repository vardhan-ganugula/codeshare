import React from 'react'
function QrComponent({qrCode}) {
  return (
    <div className='md:w-[300px] md:h-[300px] w-[200px] mx-auto p-2 overflow-hidden rounded bg-red-300 my-2'>
        <img src={qrCode} alt="qr code" className='w-full h-full object-cover aspect-square' />
    </div>
  )
}

export default QrComponent