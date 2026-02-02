import React from "react";
import { Box, Typography, Button } from "@mui/material";

// TODO: Accept status, message, and actions as props
const PaymentResult = () => {
  return (
    <Box mt={5} textAlign="center">
      <Typography variant="h5" mb={2}>
        {/* TODO: Show success or failure message */}
        Payment Status
      </Typography>
      {/* TODO: Show details and actions (e.g., go back, retry) */}
      <Button variant="contained" color="primary">
        Go to Home
      </Button>
    </Box>
  );
};

export default PaymentResult;
