import { useCallback } from "react";

// Loads the Razorpay script if not already loaded
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("razorpay-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}

interface RazorpayOrder {
  id: string;
  amount: number; // in paise
  currency: string;
  key: string; // Razorpay key_id
  name?: string;
  description?: string;
  prefill?: {
    email?: string;
    contact?: string;
  };
}

interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export function useRazorpay() {
  const openRazorpay = useCallback(
    async (
      order: RazorpayOrder,
      onSuccess: (result: RazorpayPaymentResult) => void,
      onFailure: (error: Error) => void
    ) => {
      await loadRazorpayScript();
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: order.name || "Purchase Coins",
        description: order.description || "",
        order_id: order.id,
        prefill: order.prefill || {},
        handler: function (response: Record<string, string>) {
          onSuccess({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: function () {
            onFailure(new Error("Payment cancelled"));
          },
        },
      };
      // @ts-expect-error: Razorpay is a global injected by the Razorpay script
      const rzp = new window.Razorpay(options);
      rzp.open();
    },
    []
  );
  return openRazorpay;
}
