"use client";
import React, { useState, Suspense } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { apiGet, apiPost } from "../../utils/api";
import { CoinPackage } from "../../components/CoinPackages";
import CustomCoinInput from "../../components/CustomCoinInput";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRazorpay } from "../../hooks/useRazorpay";
import { useMemo } from "react";

// TypeScript interfaces
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

interface OrderResponse {
  data: {
    order_id: string;
    amount: number;
    currency: string;
  };
}

interface PaymentVerificationResponse {
  success: boolean;
  message: string;
}

interface BalanceResponse {
  data: {
    balance: number;
  };
}

function PurchasePageContent() {
  const {
    tokens,
    isAuthenticated,
    loading: authLoading,
    error: authError,
  } = useAuth();

  // Selection state
  const [selectedPackageId, setSelectedPackageId] = useState<
    string | undefined
  >(undefined);
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [customSelected, setCustomSelected] = useState(false);
  const openRazorpay = useRazorpay();
  const [paymentResult, setPaymentResult] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  const theme = useTheme();
  const queryClient = useQueryClient();

  // Fetch coin packages
  const {
    data: packagesResponse,
    isLoading: packagesLoading,
    error: packagesError,
  } = useQuery<PackageResponse>({
    queryKey: ["coin-packages", tokens?.accessToken],
    queryFn: () =>
      apiGet<PackageResponse>("/payment/packages", tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  // Extract and map packages
  const conversionRate = packagesResponse?.data?.conversion_rate;
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
    isLoading: balanceLoading,
    error: balanceError,
  } = useQuery<BalanceResponse>({
    queryKey: ["user-balance", tokens?.accessToken],
    queryFn: () =>
      apiGet<BalanceResponse>("/payment/balance", tokens?.accessToken),
    enabled: !!tokens?.accessToken,
  });

  // Payment initiation mutation
  const paymentMutation = useMutation({
    mutationFn: async ({ price }: { price: number }) => {
      if (customSelected) {
        return apiPost<OrderResponse>(
          "/payment/create-order",
          { custom_amount_in_rupees: price },
          tokens?.accessToken
        );
      } else if (selectedPackageId) {
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

  // Handle selection
  const handlePackageSelect = (id: string) => {
    setSelectedPackageId(id);
    setCustomSelected(false);
  };
  const handleCustomSelect = () => {
    setSelectedPackageId(undefined);
    setCustomSelected(true);
  };

  // Payment initiation
  const handleProceedToPayment = () => {
    let price = 0;
    if (customSelected) {
      price = customAmount; // 1 coin = ₹1
    } else if (selectedPackageId && packages) {
      const pkg = packages.find((p) => p.id === selectedPackageId);
      if (!pkg) return;
      price = pkg.price;
    } else {
      return;
    }
    paymentMutation.mutate({ price });
  };

  // Handle show coin history
  const handleShowCoinHistory = () => {
    // Send postMessage to Flutter app to show coin history

    window.postMessage(
      {
        type: "SHOW_COIN_HISTORY",
        data: {
          currentBalance: balanceData?.data?.balance || 0,
        },
      },
      "*"
    );
  };

  if (authLoading || packagesLoading || balanceLoading)
    return (
      <Box mt={8} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (authError) return <Alert severity="error">{authError}</Alert>;
  if (packagesError)
    return <Alert severity="error">{(packagesError as Error).message}</Alert>;
  if (balanceError)
    return <Alert severity="error">{(balanceError as Error).message}</Alert>;
  if (!isAuthenticated)
    return (
      <Alert severity="warning">
        You must be authenticated to purchase coins.
      </Alert>
    );

  return (
    <Box
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={1}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          mt: 4,
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} textAlign="center">
          Purchase Coins
        </Typography>
        <Typography variant="subtitle1" mb={1} textAlign="center">
          Your balance: <b>{balanceData?.data?.balance}</b> coins
        </Typography>
        {conversionRate && (
          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
            textAlign="center"
          >
            Conversion Rate: 1 Rupee = {conversionRate} Coins
          </Typography>
        )}
        {paymentResult && (
          <Alert
            severity={paymentResult.success ? "success" : "error"}
            sx={{ mb: 2 }}
          >
            {paymentResult.message}
          </Alert>
        )}
        {packages && packages.length > 0 && (
          <Box mb={3}>
            <Typography variant="h6" mb={2} textAlign="center">
              Select a Coin Package
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
              {packages.map((pkg) => (
                <Button
                  key={pkg.id}
                  variant={
                    selectedPackageId === pkg.id ? "contained" : "outlined"
                  }
                  color={selectedPackageId === pkg.id ? "primary" : "inherit"}
                  onClick={() => handlePackageSelect(pkg.id)}
                  sx={{
                    minWidth: 120,
                    mb: 1,
                    fontWeight: 600,
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
                  disabled={!pkg.is_active}
                >
                  {pkg.base_coins}
                  {pkg.bonus_coins ? ` + ${pkg.bonus_coins} Bonus` : ""} Coins -
                  ₹{pkg.price}
                </Button>
              ))}
            </Box>
          </Box>
        )}
        <Box mb={3}>
          <CustomCoinInput
            value={customAmount}
            onChange={setCustomAmount}
            selected={customSelected}
            onSelect={handleCustomSelect}
            onBuy={handleProceedToPayment}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            mt: 1,
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
          }}
          onClick={handleProceedToPayment}
          disabled={
            paymentMutation.status === "pending" ||
            (!customSelected && !selectedPackageId) ||
            (customSelected && (!customAmount || customAmount <= 0))
          }
        >
          {paymentMutation.status === "pending"
            ? "Processing..."
            : "Proceed to Payment"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          size="medium"
          sx={{
            mt: 2,
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            py: 1,
            borderRadius: 2,
          }}
          onClick={handleShowCoinHistory}
        >
          Show Coin History
        </Button>
        {paymentMutation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {(paymentMutation.error as Error).message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <PurchasePageContent />
    </Suspense>
  );
}
