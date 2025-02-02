import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
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
  {
    segment: "home",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "screener",
    title: "Screener",
    icon: <ShowChartIcon />,
  },
  {
    segment: "map",
    title: "Map",
    icon: <MapIcon />,
  },
  {
    segment: "crypto",
    title: "Crypto",
    icon: <CurrencyBitcoinIcon />,
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
            >
              {children}
            </NextAppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
