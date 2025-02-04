import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const ForexCrossRates = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.ForexCrossRates),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface ForexCrossRatesProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  styles?: CopyrightStyles; // 테마 색상
  currencies?: string[];
}

export default function ForexCrossRatesWrapper({
  colorTheme = "light",
  currencies = ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"],
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
}: ForexCrossRatesProps) {
  return (
    <ForexCrossRates
      colorTheme={colorTheme}
      copyrightStyles={styles}
      isTransparent
      locale="kr"
      width="100%"
    />
  );
}
