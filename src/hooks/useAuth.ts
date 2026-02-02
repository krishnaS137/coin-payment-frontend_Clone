import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export function useAuth() {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // Utility to handle token injection from window or postMessage
  const handleTokenInjection = useCallback(
    (data: { accessToken: string; refreshToken?: string }) => {
      if (data && data.accessToken) {
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    // 0. Try to read from URL query parameters
    if (searchParams) {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");

      if (accessToken) {
        handleTokenInjection({
          accessToken,
          refreshToken: refreshToken || undefined,
        });
        return;
      }
    }

    // 1. Try to read from window object
    // e.g., window.injectedToken = { accessToken: '...', refreshToken: '...' }
    if (
      typeof window !== "undefined" &&
      (
        window as unknown as {
          injectedToken?: { accessToken: string; refreshToken?: string };
        }
      ).injectedToken
    ) {
      handleTokenInjection(
        (
          window as unknown as {
            injectedToken: { accessToken: string; refreshToken?: string };
          }
        ).injectedToken!
      );
      return;
    }

    // 1.5. Try to read from localStorage (manual input)
    if (typeof window !== "undefined") {
      const manualAccessToken = localStorage.getItem("manualAccessToken");
      if (manualAccessToken) {
        const manualRefreshToken =
          localStorage.getItem("manualRefreshToken") || undefined;
        handleTokenInjection({
          accessToken: manualAccessToken,
          refreshToken: manualRefreshToken,
        });
        return;
      }
    }

    // 2. Listen for postMessage from mobile app
    function onMessage(
      event: MessageEvent<{ accessToken: string; refreshToken?: string }>
    ) {
      // You may want to validate event.origin here
      if (event.data && event.data.accessToken) {
        handleTokenInjection(event.data);
      }
    }
    window.addEventListener("message", onMessage);

    // 3. Timeout or error if no token received after a while
    const timeout = setTimeout(() => {
      setLoading(false);
      setError("No token received from mobile app.");
    }, 5000);

    return () => {
      window.removeEventListener("message", onMessage as EventListener);
      clearTimeout(timeout);
    };
  }, [handleTokenInjection, searchParams]);

  // TODO: Add refresh logic if accessToken expires and refreshToken is available

  return {
    tokens,
    loading,
    error,
    isAuthenticated: !!tokens?.accessToken,
    // TODO: add logout and refresh methods if needed
  };
}
