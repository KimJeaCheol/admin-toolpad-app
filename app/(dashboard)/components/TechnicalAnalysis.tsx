import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const TechnicalAnalysis = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.TechnicalAnalysis),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface TechnicalAnalysisProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  styles?: CopyrightStyles; // 테마 색상
  symbol?: string; // 테마 색상
}

export default function TechnicalAnalysisWrapper({
  colorTheme = "light",
  symbol = "",
  styles = {
    parent: {
      fontSize: "24px",
      color: "red",
      display: "none", // Hide the copyright section
    },
    link: {
      textDecoration: "line-trough",
    },
    span: {
      color: "darkblue",
    },
  },
}: TechnicalAnalysisProps) {
  return (
    <TechnicalAnalysis
      colorTheme={colorTheme}
      copyrightStyles={styles}
      isTransparent
      locale="kr"
      symbol={symbol}
    />
  );
}
