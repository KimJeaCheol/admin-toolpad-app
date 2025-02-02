"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import CustomDataGrid from "../../components/CustomDataGrid";
import CustomDatePicker from "../../components/CustomDatePicker";

export default function OrdersPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1}>
        <Grid container>
          <Grid size={12}>
            <CustomDatePicker />
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={12}>
            <CustomDataGrid />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
