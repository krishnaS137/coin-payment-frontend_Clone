"use client";
import React, { Suspense, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress, Alert } from "@mui/material";
import { useAuth } from '../../hooks/useAuth';
import CoinPill from '../../components/CoinPill'
import YourCoinsSection from '../../components/YourCoinsSection'
import PackageCard from '../../components/PackageCard'
import { useRazorpay } from '../../hooks/useRazorpay';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '../../utils/api';
import { CoinPackage } from '../../components/CoinPackages';

interface PackageResponse {
  data: {
    conversion_rate: number;        // How many coins per rupee
    packages: Array<{
      id: string;                   // Unique package ID
      base_coins: number;           // Base coins in package
      bonus_coins?: number;         // Bonus coins (optional)
      amount_in_rupees: number;     // Price in rupees
      is_active: boolean;           // Whether package is available
    }>;
  };
}

interface BalanceResponse {
  data: {
    balance: number;                // Current coin balance
  };
}

interface OrderResponse {
  data: {
    order_id: string;               // Unique order ID
    amount: number;                 // Amount in paise (Razorpay requirement)
    currency: string;               // Currency (usually "INR")
  };
}

interface PaymentVerificationResponse {
  success: boolean;                 // Payment verification result
  message: string;                  // Success/error message
}

  

function BuyCoinContent() {
  const router = useRouter()
  
  // Authentication hook - same as purchase page
  const {
    tokens,
    isAuthenticated,
    loading: authLoading,
    error: authError,
  } = useAuth();

  const [selectedPackageId, setSelectedPackageId] = useState<
  string | undefined
  >(undefined);
  const openRazorpay = useRazorpay();
  const [paymentResult,setPaymentResult]= useState<null | {
    success:boolean;
    message:string;}>(null);
    const queryClient = useQueryClient();
//Fetch coin packages
   const {
    data:packagesResponse,
   }= useQuery<PackageResponse>({
    queryKey:["coin-packages",tokens?.accessToken],
    queryFn:()=>apiGet<PackageResponse>("/payment/packages",tokens?.accessToken),
    enabled:!!tokens?.accessToken,
   })
  
   const packages: CoinPackage[] = useMemo(() => {
    if (!packagesResponse?.data?.packages) return [];
    return packagesResponse.data.packages.map((pkg) => ({
      id: pkg.id,
      coins: pkg.base_coins + (pkg.bonus_coins || 0),
      base_coins: pkg.base_coins,
      bonus_coins: pkg.bonus_coins,
      price: pkg.amount_in_rupees,
      is_active: pkg.is_active,
    }));
  }, [packagesResponse]);

  // Fetch user balance
  const {
    data: balanceData,
  } = useQuery<BalanceResponse>({
    queryKey: ["user-balance", tokens?.accessToken],
    queryFn: () =>
      apiGet<BalanceResponse>("/payment/balance", tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });
  const balance = balanceData?.data?.balance || 0;

  // Payment initiation mutation
  const paymentMutation = useMutation({
    mutationFn: async () => {
      if (selectedPackageId) {
        return apiPost<OrderResponse>(
          "/payment/create-order",
          { package_id: selectedPackageId },
          tokens?.accessToken
        );
      } else {
        throw new Error("No package or custom amount selected");
      }
    },
    onSuccess: (orderResponse) => {
      const order = orderResponse.data;
      openRazorpay(
        {
          id: order.order_id,
          amount: order.amount,
          currency: order.currency,
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
          name: "Purchase Coins",
          description: `Buy coins`,
          prefill: undefined,
        },
        async (result) => {
          // On payment success, verify payment
          try {
            await apiPost<PaymentVerificationResponse>(
              "/payment/verify-payment",
              result,
              tokens?.accessToken
            );
            setPaymentResult({
              success: true,
              message: "Payment successful! Coins will be credited soon.",
            });
            queryClient.invalidateQueries({
              queryKey: ["user-balance", tokens?.accessToken],
            });

            // Send postMessage to Flutter app about successful payment

            window.postMessage(
              {
                type: "PAYMENT_SUCCESS",
                data: {
                  success: true,
                  message: "Payment successful! Coins will be credited soon.",
                  orderId: order.order_id,
                  amount: order.amount,
                  currency: order.currency,
                },
              },
              "*"
            );
          } catch (e) {
            setPaymentResult({
              success: false,
              message:
                e instanceof Error ? e.message : "Payment verification failed",
            });

            // Send postMessage to Flutter app about payment failure

            window.postMessage(
              {
                type: "PAYMENT_FAILED",
                data: {
                  success: false,
                  message:
                    e instanceof Error
                      ? e.message
                      : "Payment verification failed",
                  orderId: order.order_id,
                },
              },
              "*"
            );
          }
        },
        (error) => {
          setPaymentResult({
            success: false,
            message: error.message || "Payment cancelled or failed",
          });

          // Send postMessage to Flutter app about payment cancellation/failure

          window.postMessage(
            {
              type: "PAYMENT_CANCELLED",
              data: {
                success: false,
                message: error.message || "Payment cancelled or failed",
                orderId: order.order_id,
              },
            },
            "*"
          );
        }
      );
    },
    onError: () => {
      // Error will be shown below
    },
  });

  // Add this function to handle package selection when "Buy Now" is clicked
const handlePackageBuy = (packageId: string) => {
  setSelectedPackageId(packageId);
  // Immediately trigger payment for this package
  paymentMutation.mutate();
};

  const handleWithdrawClick = () => {
    console.log('Custom withdraw handler called!')
    router.push('/withdraw-coins')
  }

  const handleBackClick = () => {
    router.back() // Go back to previous page
  }

  // Authentication loading state - same as purchase page
  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <CircularProgress />
      </div>
    );
  }

  // Authentication error state - same as purchase page
  if (authError) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 p-4">
        <Alert severity="error">{authError}</Alert>
      </div>
    );
  }

  // Authentication required state - same as purchase page
  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 p-4">
        <Alert severity="warning">
          You must be authenticated to purchase coins.
        </Alert>
      </div>
    );
  }

  return (
    <div className="position-relative min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Buy Coins Title */}
      <h1 className="buy-coins-title">
        Buy Coins
      </h1>

      {/* Coins Pill */}
      <CoinPill />

      {/* Back Arrow - CLEAN SVG ICON */}
      <button 
        className="back-arrow-btn"
        onClick={handleBackClick}
        aria-label="Go back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Your Coins Section */}
      <YourCoinsSection 
        coins={balance} // This will be replaced with real data from backend
        showWithdraw={true}
        onWithdrawClick={handleWithdrawClick}
      />
      {/* Add after YourCoinsSection to show payment results */}
      {paymentResult && (
        <div className={`alert ${paymentResult.success ? 'alert-success' : 'alert-danger'}`} style={{ margin: '20px' }}>
          {paymentResult.message}
        </div>
      )}

      {/* Packages Section - FIXED STRUCTURE */}
      <div className="packages-section">
        <h3 className="packages-title">Packages</h3>
        {/* Remove the nested container - just use one */}
        {packages && packages.length > 0 ? (
          <div className="packages-container">
            {packages.map((pkg) => (
              <PackageCard 
                key={pkg.id}
                packageName={`${pkg.base_coins} Coins`}
                originalPrice={`₹${pkg.price}`}
                currentPrice={`₹${pkg.price}`}
                coins={pkg.coins.toString()}
                discount={pkg.bonus_coins ? `${Math.round((pkg.bonus_coins / pkg.coins) * 100)}% Bonus` : "No Bonus"}
                isBestSeller={false}
                onBuyNow={() => handlePackageBuy(pkg.id)}
                id={pkg.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-4">
            <p>No packages available</p>
          </div>
        )}
      </div>

      {/* Coins History - MOVED BELOW PACKAGES */}
      <div className="coins-history-section">
        <div className="coins-history-content">
          <div className="coins-history-icon">
            <div className="history-icon-inner"></div>
          </div>
          <span className="coins-history-text">Coins History</span>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper - same as purchase page
export default function BuyCoin() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BuyCoinContent />
    </Suspense>
  );
}