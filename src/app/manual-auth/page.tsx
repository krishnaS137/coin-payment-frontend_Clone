"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function ManualAuthPage() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setError("Access token is required");
      return;
    }
    // Store tokens in localStorage
    localStorage.setItem("manualAccessToken", accessToken);
    if (refreshToken) {
      localStorage.setItem("manualRefreshToken", refreshToken);
    } else {
      localStorage.removeItem("manualRefreshToken");
    }
    // Redirect to purchase page
    router.push("/purchase");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Manual Token Input
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Paste your JWT access token (and optionally refresh token) to
          authenticate manually.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Refresh Token (optional)"
            value={refreshToken}
            onChange={(e) => setRefreshToken(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Proceed
          </Button>
        </form>
      </Box>
    </Container>
  );
}
