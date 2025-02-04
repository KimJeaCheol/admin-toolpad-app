import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const CryptoCurrencyMarket = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.CryptoCurrencyMarket),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface CryptoCurrencyMarketProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  styles?: CopyrightStyles; // 테마 색상
}

export default function CryptoCurrencyMarketWrapper({
  colorTheme = "light",
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
}: CryptoCurrencyMarketProps) {
  return (
    <CryptoCurrencyMarket
      colorTheme={colorTheme}
      copyrightStyles={styles}
      locale="kr"
      isTransparent
      defaultColumn="overview"
      screener_type="crypto_mkt"
      displayCurrency="USD"
    />
  );
}
