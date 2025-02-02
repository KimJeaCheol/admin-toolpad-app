import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const Ticker = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.Ticker),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface TickerProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  styles?: CopyrightStyles; // 테마 색상
}

export default function TickerWrapper({
  colorTheme = "light",
  styles = {
    parent: {
      fontSize: "24px",
      color: "red",
    },
    link: {
      textDecoration: "line-trough",
    },
    span: {
      color: "darkblue",
    },
  },
}: TickerProps) {
  return <Ticker colorTheme={colorTheme} copyrightStyles={styles} />;
}
