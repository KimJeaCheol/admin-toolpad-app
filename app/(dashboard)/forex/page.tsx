"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import AdvancedRealTimeChartWrapper from "../components/AdvancedRealTimeChart";
import CompanyProfileWrapper from "../components/CompanyProfile";
import EconomicCalendarWrapper from "../components/EconomicCalendar";
import ForexCrossRatesWrapper from "../components/ForexCrossRates";
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
            <SymbolInfoWrapper colorTheme="light" symbol="PEPPERSTONE:USDKRW" />
          </Box>

          <AdvancedRealTimeChartWrapper
            colorTheme="light"
            symbol="PEPPERSTONE:USDKRW"
          />
          <CompanyProfileWrapper colorTheme="light" symbol="OANDA:EURUSD" />
          <Stack direction="row" spacing={2}>
            <TechnicalAnalysisWrapper
              colorTheme="light"
              symbol="PEPPERSTONE:USDKRW"
            />
            <TimelineWrapper colorTheme="light" symbol="OANDA:EURUSD" />
          </Stack>
          <EconomicCalendarWrapper colorTheme="light" />
          <ForexCrossRatesWrapper colorTheme="light" />
        </Grid>
      </Box>
    </Box>
  );
}
