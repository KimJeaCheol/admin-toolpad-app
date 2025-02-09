"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import DashboardTable from "./components/ScreenerTable";

export default function OrdersPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1}>
        <Grid container>
          <Grid size={12}>
            <DashboardTable />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
