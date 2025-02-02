import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const CryptoCoinsHeatmap = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.CryptoCoinsHeatmap),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface CryptoCoinsHeatmapProps {
  colorTheme?: "light" | "dark"; // 테마 색상
}

export default function CryptoCoinsHeatmapWrapper({
  colorTheme = "light",
}: CryptoCoinsHeatmapProps) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <CryptoCoinsHeatmap colorTheme={colorTheme} autoSize={true} />
    </Box>
  );
}
