import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const TickerTape = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.TickerTape),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface TickerTapeProps {
    colorTheme?: "light" | "dark"; // 테마 색상
    styles?: CopyrightStyles; // 테마 색상
}

export default function TickerTapeWrapper({
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
      }
}: TickerTapeProps) {
  return (
      <TickerTape
        colorTheme={colorTheme} copyrightStyles={styles}
      />
  );
}
