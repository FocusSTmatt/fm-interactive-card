import React from 'react'
import '../styles/card.css'
import { BsCircleFill } from 'react-icons/bs'
import { BsCircle } from 'react-icons/bs'

function Card({name, number, month, year, cvc, state}) {
  return (
    <div className='Card'>
        <div className='card-back'>
            <p className='cvc'>{cvc}</p>
        </div>
        <div className='card-front'>
            <div className='circle-ctn'>
                <BsCircleFill className='circle-fill' />
                <BsCircle className='circle-hollow' />
            </div>
            <div className='card-info'>
                <h2 className='number'>{number}</h2>
                <div className='name-exp-ctn'>
                    <p className='name'>{name}</p>
                    <p className='exp'>{month}/{year}</p>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Card