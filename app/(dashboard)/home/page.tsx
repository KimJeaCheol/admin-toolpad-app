"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useCallback, useState } from "react";
import ScreenerWrapper from "../screener/components/Screener";
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
  outline: "",
};

// ✅ 애니메이션 효과 적용 (최적화)
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HomePage() {
  // ✅ 상태를 하나의 useState로 관리하여 불필요한 리렌더링 방지
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    scroll: DialogProps["scroll"];
  }>({ open: false, scroll: "paper" });

  // ✅ useCallback을 사용하여 함수가 매번 새로 생성되지 않도록 최적화
  const handleClickOpen = useCallback(
    (scrollType: DialogProps["scroll"]) => () => {
      setDialogState({ open: true, scroll: scrollType });
    },
    []
  );

  const handleClose = useCallback(() => {
    setDialogState((prev) => ({ ...prev, open: false }));
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box style={style}>
        {/* <Button variant="contained" onClick={handleClickOpen("paper")}>
          증시캘린더 보기
        </Button> */}
        <Dialog
          open={dialogState.open}
          onClose={handleClose}
          scroll={dialogState.scroll}
          TransitionComponent={Transition} // ✅ 트랜지션 효과 추가
          aria-labelledby="market-calendar-dialog-title"
          aria-describedby="market-calendar-dialog-description"
        >
          <DialogTitle id="market-calendar-dialog-title">
            증시 캘린더
          </DialogTitle>
          <DialogContent dividers={dialogState.scroll === "paper"}>
            <DialogContentText
              id="market-calendar-dialog-description"
              tabIndex={-1}
            >
              {[...new Array(30)]
                .map(
                  () =>
                    `📅 증시 캘린더 이벤트 정보:
                  - 기업 실적 발표
                  - 금리 발표
                  - 주요 경제지표 발표
                  - 시장 변동성 예상일`
                )
                .join("\n")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Stack spacing={1}>
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
