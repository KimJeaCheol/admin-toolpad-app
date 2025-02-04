import dynamic from "next/dynamic";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const SymbolOverview = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SymbolOverview),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface SymbolOverviewProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  autosize?: boolean; // 크기 자동 조정
  chartType?: "candlesticks" | "bars" | "line"; // 차트 타입
  downColor?: string; // 하락 캔들 색상
  borderDownColor?: string; // 하락 캔들 테두리 색상
  wickDownColor?: string; // 하락 캔들 심지 색상
  dateFormat : "yyyy-MM-dd";
}

export default function SymbolOverviewWrapper({
  colorTheme = "light",
  autosize = true,
  chartType = "candlesticks",
  downColor = "#FF0000",
  borderDownColor = "#FF0000",
  wickDownColor = "#FF0000",
  dateFormat,
}: SymbolOverviewProps) {
  return (
      <SymbolOverview
        colorTheme={colorTheme}
        chartType={chartType}
        downColor={downColor}
        borderDownColor={borderDownColor}
        wickDownColor={wickDownColor}
        dateFormat={dateFormat}      
        height={400} width="100%"
      />
  );
}
