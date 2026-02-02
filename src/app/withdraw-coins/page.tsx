"use client";
import React, { useState, Suspense ,useCallback} from 'react'
import CoinPill from '../../components/CoinPill'
import { useRouter } from 'next/navigation'
import MinCoinSec from '../../components/MinCoinSec'
import NextButton from '../../components/NextButton'
import WithdrawAmt from '../../components/WithdrawAmt'
import BankForm from '../../components/BankForm'
import KYC from '../../components/KYC'
import { useQuery , useMutation} from '@tanstack/react-query'
import { apiGet, apiPostFormData } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'
import { CircularProgress } from '@mui/material'
import Withdrawal_Success from '@/components/Withdrawal_Success';

interface PackageResponse {
  data: {
    conversion_rate: number;
    packages: Array<{
      id: string;
      base_coins: number;
      bonus_coins?: number;
      amount_in_rupees: number;
      is_active: boolean;
    }>;
  };
}

// Add proper types for bank and KYC data
interface BankDetails {
  bank_account_number: string;
  ifsc_code: string;
  bank_account_name: string;
}

interface KYCDetails {
  aadhar_front_file: File | null;
  aadhar_back_file: File | null;
  pan_card_file: File | null;
}

const WithdrawCoins = () => {
  const router = useRouter()
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [showError, setShowError] = useState(false)
  const [currentStep, setCurrentStep] = useState('amount') // 'amount', 'bank-details', or 'kyc'
  const {tokens}=useAuth();
  const [withdrawalData, setWithdrawalData] = useState({
    coins_amount: 0,
    bank_details: {
      bank_account_number: '',
      ifsc_code: '',
      bank_account_name: '',
    },
    kyc_details: {
      aadhar_front_file: null as File | null,
      aadhar_back_file: null as File | null,
      pan_card_file: null as File | null
    }
  });
  
  // Remove unused variables
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {data:packagesResponse}=useQuery({
    queryKey:["coin-packages",tokens?.accessToken],
    queryFn:()=>apiGet<PackageResponse>("/payment/packages",tokens?.accessToken),
    enabled:!!tokens?.accessToken,
  })
  const conversionRate = packagesResponse?.data?.conversion_rate;
  const initiateWithdrawal = useMutation<void, Error, FormData>({
    mutationFn: (fd) =>
      apiPostFormData<void>("/coins/withdrawal/initiate", fd, tokens?.accessToken),
    onSuccess: () => {
      setCurrentStep('success');
    }
  });
  const MIN_WITHDRAWAL =  (conversionRate || 0);
  const MAX_WITHDRAWAL =  (conversionRate || 0)+20;
  
  const handleBackClick = () => {
    router.back() // Go back to previous page
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value
    setWithdrawalAmount(amount)
    // Clear error when user starts typing again
    if (showError) {
      setShowError(false)
    }
  }
  
  const handleAmountSet = (amount: number) => {
    setWithdrawalData(prev => ({ ...prev, coins_amount: amount }));
  }

  // Fix type annotations
  const handleBankDetailsChange = (bankData: BankDetails) => {
    setWithdrawalData(prev => ({ ...prev, bank_details: bankData }));
  }

  const handleKYCChange = (kycData: KYCDetails) => {
    setWithdrawalData(prev => ({ ...prev, kyc_details: kycData }));
  }

  const handleNextClick = async () => {
    if (currentStep === 'amount') {
      const numAmount = parseInt(withdrawalAmount) || 0
      if (numAmount < MIN_WITHDRAWAL || numAmount > MAX_WITHDRAWAL) {
        setShowError(true)
      } else {
        setShowError(false)
        // Move to bank details step
        setCurrentStep('bank-details')
      }
    } else if (currentStep === 'bank-details') {
      // Move to KYC step
      setCurrentStep('kyc')
    } else if (currentStep === 'kyc') {
      // Handle final submission
      await handleWithdrawalSubmit();
    }
  }

  const handleWithdrawalSubmit = async () => {
    if (!tokens?.accessToken) {
      setSubmissionError("Authentication required");
      return;
    }

    // Basic validation - just check if required fields exist
    if (!withdrawalData.coins_amount || 
        !withdrawalData.bank_details.bank_account_number ||
        !withdrawalData.kyc_details.aadhar_front_file ||
        !withdrawalData.kyc_details.pan_card_file) {
      setSubmissionError("Please complete all required fields");
      return;
    }

    setSubmissionError(null);

    try {
      const formData = new FormData();
      
      // Add coins amount
      formData.append('coins_amount', withdrawalData.coins_amount.toString());
      
      // Add bank details
      Object.entries(withdrawalData.bank_details).forEach(([key, value]) => {
        formData.append(`bank_details[${key}]`, value);
      });
      
      // Add KYC files
      if (withdrawalData.kyc_details.aadhar_front_file) {
        formData.append('kyc_details[aadhar_front_file]', withdrawalData.kyc_details.aadhar_front_file);
      }
      if (withdrawalData.kyc_details.aadhar_back_file) {
        formData.append('kyc_details[aadhar_back_file]', withdrawalData.kyc_details.aadhar_back_file);
      }
      if (withdrawalData.kyc_details.pan_card_file) {
        formData.append('kyc_details[pan_card_file]', withdrawalData.kyc_details.pan_card_file);
      }

      // console.log('FormData being sent:');
      // for (const [key, value] of formData.entries()) { // Fix: use const instead of let
      //   console.log(`${key}:`, value);
      // }

      await initiateWithdrawal.mutateAsync(formData); // Remove unused response variable
      
      
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Withdrawal failed');
    }
  };
  
  const handleSuccessDone = () => {
    router.push('/buy-coins');
  };

  const getButtonText = () => {
    return currentStep === 'kyc' ? 'Withdraw' : 'Next'
  }
  const isNextDisabled =useCallback(() => {

    if (currentStep === 'bank-details') {
      return !withdrawalData.bank_details.bank_account_number || 
             !withdrawalData.bank_details.ifsc_code || 
             !withdrawalData.bank_details.bank_account_name;
    }
    if (currentStep === 'kyc') {
      return !withdrawalData.kyc_details.aadhar_front_file || 
             !withdrawalData.kyc_details.pan_card_file;
    }
    return false;
  },[
    currentStep,
    withdrawalData.bank_details.bank_account_number,
    withdrawalData.bank_details.ifsc_code,
    withdrawalData.bank_details.bank_account_name,
    withdrawalData.kyc_details.aadhar_front_file,
    withdrawalData.kyc_details.pan_card_file
  ])
  return (
    <div className="min-vh-100 p-4">
      <CoinPill />
      <button
        className="back-arrow-btn"
        onClick={handleBackClick}
        aria-label="Go back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h1 className="buy-coins-title">
        Withdraw Coins
      </h1>


      {currentStep === 'success' ? (
        <Withdrawal_Success 
          coinsAmount={withdrawalData.coins_amount}
          onDone={handleSuccessDone}
        />
      ) : (
        <>
          <div className='d-flex justify-content-center align-items-center gap-3 gap-md-4 gap-lg-5'
            style={{ marginTop: '190px', padding: '0 15px' }}>

            {/* Amount Tab */}
            <div className='text-center position-relative cursor-pointer flex-fill mx-3' style={{ minWidth: '80px' }}>
              <div className='fw-medium fs-6' style={{ color: currentStep === 'amount' ? '#B68580' : '#9E9C9C' }}>Amount</div>
              <div className='mt-2' style={{
                borderBottom: `3px solid ${currentStep === 'amount' ? '#B68580' : '#9E9C9C'}`,
                width: '100%'
              }}></div>
            </div>

            {/* Bank Details Tab */}
            <div className='text-center position-relative cursor-pointer flex-fill mx-3' style={{ minWidth: '100px' }}>
              <div className='fw-medium fs-6' style={{ color: currentStep === 'bank-details' ? '#B68580' : '#9E9C9C' }}>Bank Details</div>
              <div className='mt-2' style={{
                borderBottom: `3px solid ${currentStep === 'bank-details' ? '#B68580' : '#9E9C9C'}`,
                width: '100%'
              }}></div>
            </div>

            {/* KYC Tab */}
            <div className='text-center position-relative cursor-pointer flex-fill mx-3' style={{ minWidth: '60px' }}>
              <div className='fw-medium fs-6' style={{ color: currentStep === 'kyc' ? '#B68580' : '#9E9C9C' }}>KYC</div>
              <div className='mt-2' style={{
                borderBottom: `3px solid ${currentStep === 'kyc' ? '#B68580' : '#9E9C9C'}`,
                width: '100%'
              }}></div>
            </div>
          </div>
          
          {/* Conditional Rendering based on current step */}
          {currentStep === 'amount' ? (
            <>
              <div className='d-flex flex-column ' style={{
                marginTop: '50px',
                padding: '0 20px',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                <MinCoinSec conversionRate={conversionRate || 0} maxWithdrawal={MAX_WITHDRAWAL} minWithdrawal={MIN_WITHDRAWAL}/>
              </div>
              <WithdrawAmt 
                value={withdrawalAmount}
                onChange={handleAmountChange}
                onAmountSet={handleAmountSet}
              />
              
              {/* Error Message */}
              {showError && (
                <div className='text-center mt-2' style={{
                  color: '#dc3545',
                  fontSize: '20px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  The amount you have entered is not incorrect.
                </div>
              )}
            </>
          ) : currentStep === 'bank-details' ? (
            <>
              <div className='d-flex flex-column ' style={{
                marginTop: '50px',
                padding: '0 20px',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                <BankForm 
                  data={withdrawalData.bank_details}
                  onChange={handleBankDetailsChange}
                />
              </div>
            </>
          ) :  (
            <>
              <div className='d-flex flex-column ' style={{
                marginTop: '50px',
                padding: '0 20px',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                <KYC 
                  data={withdrawalData.kyc_details}
                  onChange={handleKYCChange}
                />
              </div>
          </>)}

          {/* Error Message for API errors */}
          {submissionError && (
            <div className='text-center mt-2' style={{
              color: '#dc3545',
              fontSize: '20px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {submissionError}
            </div>
          )}
          
          <NextButton 
            onClick={handleNextClick} 
            buttonText={getButtonText()} 
            disabled={isNextDisabled()}
          />
          
          {/* Withdrawal Notice - Only show on KYC page */}
          {currentStep === 'kyc' && (
            <div className='text-center mt-3' style={{
              color: '#8E191C',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif',
              padding: '0 20px'
            }}>
              Withdraw will take up to within 7 to 14 days
            </div>
          )}
        </>
      )}
      
      {/* Footer */}
      <div className='d-flex align-items-center justify-content-center gap-3 mt-4' 
           style={{marginTop: '40px', padding: '0 20px'}}>
        <img
          src="/images/d2b70a34116dfd585990978a5ad17a787fd7225e.png"
          alt="Track withdrawal icon" 
          style={{width: '24px', height: '24px'}}
        />
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '25px',
          fontWeight: '400',
          color: '#000000'
        }}>
          Track Withdrawal Request
        </span>
      </div>
    </div>

  )
}

// Wrap the main component with Suspense
export default function WithdrawCoinsPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <WithdrawCoins />
    </Suspense>
  )
}