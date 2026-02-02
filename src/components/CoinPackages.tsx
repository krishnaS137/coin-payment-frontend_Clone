import React from "react";
import { Box, Button, Typography } from "@mui/material";

export interface CoinPackage {
  id: string;
  coins: number;
  price: number;
  base_coins: number;
  bonus_coins?: number;
  is_active?: boolean;
}

interface CoinPackagesProps {
  packages: CoinPackage[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const CoinPackages: React.FC<CoinPackagesProps> = ({
  packages,
  selectedId,
  onSelect,
}) => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Select a Coin Package
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {packages.map((pkg) => (
          <Box key={pkg.id} flex="1 1 calc(33.333% - 16px)" minWidth="120px">
            <Button
              variant={selectedId === pkg.id ? "contained" : "outlined"}
              fullWidth
              onClick={() => onSelect?.(pkg.id)}
              disabled={!pkg.is_active}
            >
              {pkg.base_coins}
              {pkg.bonus_coins ? ` + ${pkg.bonus_coins} Bonus` : ""} Coins - ₹
              {pkg.price}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CoinPackages;
