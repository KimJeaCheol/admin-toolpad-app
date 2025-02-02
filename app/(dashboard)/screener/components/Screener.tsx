import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const Screener = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.Screener),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface ScreenerProps {
  colorTheme?: "light" | "dark"; // 테마 색상
}

export default function ScreenerWrapper({
  colorTheme = "light",
}: ScreenerProps) {
  return (
    <Box>
      <Screener colorTheme={colorTheme} width={"100%"} />
    </Box>
  );
}
