import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dynamic from "next/dynamic";
import * as React from "react";

// SSR 비활성화된 SymbolOverview 컴포넌트를 동적으로 로드
const EconomicCalendars = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.EconomicCalendar),
  { ssr: false }
);

interface EconomicCalendarProps {
  open: boolean;
  onClose: () => void;
  scroll?: DialogProps["scroll"];
}

const EconomicCalendar: React.FC<EconomicCalendarProps> = ({
  open,
  onClose,
  scroll = "paper",
}) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="economic-calendar-title"
      aria-describedby="economic-calendar-description"
    >
      <DialogTitle id="economic-calendar-title">경제 캘린더</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText
          id="economic-calendar-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Box>
            <EconomicCalendars colorTheme="dark" height={400} width="100%" />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EconomicCalendar;
