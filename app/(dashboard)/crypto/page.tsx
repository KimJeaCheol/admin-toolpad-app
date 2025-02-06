"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import AdvancedRealTimeChartWrapper from "../components/AdvancedRealTimeChart";
import CompanyProfileWrapper from "../components/CompanyProfile";
import CryptoCurrencyMarketWrapper from "../components/CryptoCurrencyMarket";
import CryptoHeatmapWrapper from "../components/CryptoHeatmap";
import SymbolInfoWrapper from "../components/SymbolInfo";
import TechnicalAnalysisWrapper from "../components/TechnicalAnalysis";
import TimelineWrapper from "../components/Timeline";

export default function ScreenerPage() {
  return (
    <Box>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 960,
          margin: "0 auto", // 화면 중앙에 정렬
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            justifyContent: "space-evenly",
            alignItems: "stretch",
            gap: "32px", // 32px 간격 설정
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SymbolInfoWrapper colorTheme="light" symbol="UPBIT:BTCKRW" />
          </Box>
          <AdvancedRealTimeChartWrapper
            colorTheme="light"
            symbol="UPBIT:BTCKRW"
          />
          <CompanyProfileWrapper colorTheme="light" symbol="BITSTAMP:BTCUSD" />
          <Stack direction="row" spacing={2}>
            <TechnicalAnalysisWrapper
              colorTheme="light"
              symbol="UPBIT:BTCKRW"
            />
            <TimelineWrapper colorTheme="light" symbol="BITSTAMP:BTCUSD" />
          </Stack>
          <CryptoHeatmapWrapper colorTheme="light" />
          <CryptoCurrencyMarketWrapper colorTheme="light" />
        </Grid>
      </Box>
    </Box>
  );
}
