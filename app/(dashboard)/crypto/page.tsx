'use client';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AdvancedRealTimeChartWrapper from "./components/AdvancedRealTimeChart";
import StockMarketWrapper from "./components/StockMarket";
import SymbolOverviewWrapper from "./components/SymbolOverview";
import TickerTapeWrapper from "./components/TickerTape";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ElitePage() {  
  return(    
<Box sx={{ width: '100%' }}>
  <Stack spacing={2}>
    <Item>
    <TickerTapeWrapper colorTheme="dark"/>
    </Item>
    <Item>
    <AdvancedRealTimeChartWrapper theme="dark"></AdvancedRealTimeChartWrapper>
    </Item>
    <Item>
    <SymbolOverviewWrapper colorTheme="dark"
            chartType="candlesticks"
            downColor="#800080"
            borderDownColor="#800080"
            wickDownColor="#800080" dateFormat={'yyyy-MM-dd'} />   
    </Item>
    <Item><StockMarketWrapper colorTheme="dark"></StockMarketWrapper></Item>
  </Stack>
</Box>

  );
}