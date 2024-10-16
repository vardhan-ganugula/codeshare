import React, { useEffect, useState } from 'react'
function QrComponent({qrCode}) {
  return (
    <div className='w-[300px] h-[300px] mx-auto p-2 overflow-hidden rounded bg-red-300 my-2'>
        <img src={qrCode} alt="qr code" className='w-full h-full object-cover aspect-square' />
    </div>
  )
}

export default QrComponent