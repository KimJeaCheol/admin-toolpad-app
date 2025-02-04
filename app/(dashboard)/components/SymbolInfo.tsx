import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const SymbolInfo = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SymbolInfo),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface SymbolInfoProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  width?: string;
  styles?: CopyrightStyles; // 테마 색상
  symbol?: string; // 테마 색상
}

export default function SymbolInfoWrapper({
  colorTheme = "light",
  width = "100%",
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
}: SymbolInfoProps) {
  return (
    <SymbolInfo
      colorTheme={colorTheme}
      copyrightStyles={styles}
      locale="kr"
      isTransparent
      symbol={symbol}
    />
  );
}
