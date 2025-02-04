import dynamic from "next/dynamic";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const StockMarket = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.StockMarket),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface StockMarketProps {
    colorTheme?: "light" | "dark"; // 테마 색상
}

export default function StockMarketWrapper({
    colorTheme = "light",
}: StockMarketProps) {
  return (
      <StockMarket
        colorTheme={colorTheme} height={400} width="100%"
      />
  );
}
