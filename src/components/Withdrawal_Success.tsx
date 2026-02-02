import React from 'react'
import MaskGroup from '../../public/images/SuccessTick.png'
import NextButton from './NextButton'

interface WithdrawalSuccessProps {
  coinsAmount: number;
  onDone: () => void;
}

const Withdrawal_Success = ({ coinsAmount, onDone }: WithdrawalSuccessProps) => {
  return (
    <div className='d-flex justify-content-center align-items-center gap-5'>
        <img src={MaskGroup.src} alt="Withdrawal Success" />
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='fs-1 fw-bold'>Withdrawal Successful!</h1>
            <p>You have successfully withdrawn {coinsAmount} coins.</p>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <p>Withdraw will take up to within 7 to 14 days.</p>
        </div>
        <NextButton onClick={onDone} buttonText="Done" />
    </div>
  )
}

export default Withdrawal_Success