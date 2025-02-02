import Box from '@mui/material/Box';
import dynamic from "next/dynamic";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const StockHeatmap = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.StockHeatmap),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface StockHeatmapProps {
  colorTheme?: "light" | "dark"; // 테마 색상
}

export default function StockHeatmapWrapper({
  colorTheme = "light",
}: StockHeatmapProps) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <StockHeatmap
        colorTheme={colorTheme} autoSize={true}
      />
    </Box>
  );
}
