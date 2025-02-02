"use client";
import Box from "@mui/material/Box";
import CryptoCoinsHeatmapWrapper from "./components/CryptoHeatmap";
import StockHeatmapWrapper from "./components/StockHeatmap";

export default function MapPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "600px", // 높이를 명확하게 설정
        alignItems: "center",
      }}
    >
      <StockHeatmapWrapper colorTheme="dark"></StockHeatmapWrapper>
      <CryptoCoinsHeatmapWrapper colorTheme="dark"></CryptoCoinsHeatmapWrapper>
    </Box>
  );
}
