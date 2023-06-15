import React from 'react'
import iconComplete from '../assets/images/icon-complete.svg'
import '../styles/thankyou.css'

function ThankYou() {
  return (
    <div className='ThankYou'>
        <img src={iconComplete} />
        <h1>THANK YOU!</h1>
        <h3>We&apos;ve added your card details</h3>
        <button onClick={() => location.reload()}>Continue</button>
    </div>
  )
}

export default ThankYou