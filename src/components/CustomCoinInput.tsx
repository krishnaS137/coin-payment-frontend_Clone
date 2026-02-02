import React from "react";
import { Box, TextField, Typography } from "@mui/material";

interface CustomCoinInputProps {
  value: number;
  onChange: (value: number) => void;
  selected: boolean;
  onSelect: () => void;
  onBuy: (value: number) => void;
}

const CustomCoinInput: React.FC<CustomCoinInputProps> = ({
  value,
  onChange,
  selected,
  onSelect,
}) => {
  return (
    <Box mt={3}>
      <Typography variant="subtitle1" mb={1}>
        Or enter a custom amount
      </Typography>
      <TextField
        label="Coins"
        type="number"
        fullWidth
        value={value || ""}
        onFocus={onSelect}
        onChange={(e) => onChange(Number(e.target.value))}
        sx={
          selected
            ? {
                borderColor: "primary.main",
                borderWidth: 2,
                borderStyle: "solid",
              }
            : {}
        }
      />
    </Box>
  );
};

export default CustomCoinInput;
