"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DialogProps } from "@mui/material/Dialog";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import ScreenerWrapper from "../components/Screener";
import EconomicCalendar from "./components/EconomicCalendar";
import MarketNews from "./components/MarketNews";
import SectorList from "./components/Sector";
import TickerWrapper from "./components/Ticker";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const style = {
  // outline: "1px solid red",
};

// ✅ 애니메이션 효과 적용 (최적화)
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1}>
        <Grid container>
          <Grid size={12} style={style}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Button
                variant="contained"
                onClick={handleOpen("body")}
                color="success"
                sx={{ ml: 2 }}
              >
                증시 캘린더
              </Button>
            </Box>
            <EconomicCalendar
              open={open}
              onClose={handleClose}
              scroll={scroll}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={12} style={style}>
            <TickerWrapper colorTheme="dark" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={12} style={style}>
            <MarketNews />
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={12} style={style}>
            <ScreenerWrapper colorTheme="dark" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={12} style={style}>
            <SectorList />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
