import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

// TODO: Integrate with useAuth hook and handle form submission
const LoginForm = () => {
  return (
    <Box maxWidth={400} mx="auto" mt={8} p={3} boxShadow={2} borderRadius={2}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      <form>
        <TextField label="Email or Phone" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        {/* TODO: Add error handling and loading state */}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
