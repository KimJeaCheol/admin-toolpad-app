import dynamic from "next/dynamic";
import { CopyrightStyles } from "react-ts-tradingview-widgets";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const CryptoCoinsHeatmap = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.CryptoCoinsHeatmap),
  { ssr: false }
);

// SymbolOverview 컴포넌트 Props 타입 정의
interface CryptoCoinsHeatmapProps {
  colorTheme?: "light" | "dark"; // 테마 색상
  styles?: CopyrightStyles; // 테마 색상
}

export default function CryptoCoinsHeatmapWrapper({
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
}: CryptoCoinsHeatmapProps) {
  return (
    <CryptoCoinsHeatmap
      width="100%"
      height={500}
      dataSource="Crypto"
      blockSize="market_cap_calc"
      blockColor="change"
      hasTopBar={false}
      isZoomEnabled={true}
      hasSymbolTooltip={true}
      locale="kr"
      colorTheme={colorTheme}
      copyrightStyles={styles}
    />
  );
}
