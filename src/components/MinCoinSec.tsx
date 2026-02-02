"use client";
import React from 'react'
import Image from 'next/image'
const MinCoinSec = ({conversionRate,maxWithdrawal,minWithdrawal}:{conversionRate:number,maxWithdrawal:number,minWithdrawal:number}) => {
  return (
    <div>
        <div className='d-flex flex-column gap-1 p-3' style={{
          backgroundColor: '#B6858024',
          borderRadius: '20px',
          border: '1px solid #B68580'
        }}>
            <div className='d-flex align-items-center gap-2 mb-1'>
              <Image 
                src="/images/b840b483eeb61e83d6a21426686314fccc39ca57.png" 
                alt="Lightbulb icon" 
                style={{width: '24px', height: '24px'}}
              />
              <h3 className='mb-0'>Min coins Withdraw</h3>
            </div>
            <p className='mb-1 fst-italic'>You can withdraw minimum {minWithdrawal} coins</p>
            <p className='mb-2' style={{color: '#B68580', opacity: 0.7}}>1 coins = {conversionRate} Rs</p>
            <br />
            <h3 className='mb-1'>Max coins Withdraw</h3>
            <p className='mb-1 fst-italic'>You can withdraw maximum {maxWithdrawal} coins</p>
            <p style={{color: '#B68580', opacity: 0.7}}>1 coins = {conversionRate} Rs</p>
        </div>
    </div>
  )
}

export default MinCoinSec