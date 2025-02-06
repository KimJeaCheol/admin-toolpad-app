import CurrencyBitcoinTwoToneIcon from "@mui/icons-material/CurrencyBitcoinTwoTone";
import CurrencyExchangeTwoToneIcon from "@mui/icons-material/CurrencyExchangeTwoTone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperTwoToneIcon from "@mui/icons-material/NewspaperTwoTone";
import QueryStatsTwoToneIcon from "@mui/icons-material/QueryStatsTwoTone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowChartTwoToneIcon from "@mui/icons-material/ShowChartTwoTone";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Navigation } from "@toolpad/core/AppProvider";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import * as React from "react";
import { auth } from "../auth";
import theme from "../theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  { kind: "divider" },
  {
    segment: "home",
    title: "홈",
    icon: <HomeIcon />,
  },
  {
    segment: "news",
    title: "뉴스",
    icon: <NewspaperTwoToneIcon />,
  },
  {
    segment: "screener",
    title: "주식골라보기",
    icon: <QueryStatsTwoToneIcon />,
  },
  {
    segment: "stocks",
    title: "주식",
    icon: <ShowChartTwoToneIcon />,
  },
  {
    segment: "forex",
    title: "외환",
    icon: <CurrencyExchangeTwoToneIcon />,
  },
  {
    segment: "crypto",
    title: "암호화",
    icon: <CurrencyBitcoinTwoToneIcon />,
  },
];

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <NextAppProvider
              theme={theme}
              navigation={NAVIGATION}
              session={session}
              authentication={AUTHENTICATION}
              branding={{
                // logo: (
                //   <img
                //     src="https://www.kbanknow.com/resource/img/reform/layout/logo_kbank.png"
                //     alt="Kbank"
                //   />
                // ),
                title: "Kbank",
                homeUrl: "/toolpad/core/introduction",
              }}
            >
              {children}
            </NextAppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
