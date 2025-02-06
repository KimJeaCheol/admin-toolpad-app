import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import * as React from "react";
import Copyright from "../components/Copyright";
import SidebarFooterAccount, {
  CustomAppTitle,
  ToolbarAccountOverride,
} from "./SidebarFooterAccount";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      slots={{
        appTitle: CustomAppTitle,
        toolbarAccount: ToolbarAccountOverride,
        sidebarFooter: SidebarFooterAccount,
      }}
    >
      <PageContainer>
        {props.children}
        <Copyright sx={{ my: 4 }} />
      </PageContainer>
    </DashboardLayout>
  );
}
