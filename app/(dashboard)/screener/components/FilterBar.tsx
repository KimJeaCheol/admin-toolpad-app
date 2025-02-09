import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

export default function FilterBar() {
  const theme = useTheme(); // 현재 프로젝트의 테마 사용

  const [market, setMarket] = React.useState("해외");
  const [category, setCategory] = React.useState("");
  const [cap, setCap] = React.useState("");
  const [growthRate, setGrowthRate] = React.useState("");

  return (
    <Box
      sx={{ width: "100%", p: 2, bgcolor: theme.palette.background.default }}
    >
      {/* 🎯 타이틀 영역 */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          연속 상승세
        </Typography>
        <Typography variant="body2" color="text.secondary">
          일주일 연속 상승세를 보이는 주식
        </Typography>
      </Box>

      {/* 🎯 필터 바 전체 컨테이너 */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* 🔹 필터 버튼 & 드롭다운 그룹 */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: "wrap", alignItems: "center" }}
        >
          {/* 🔹 상단 필터 추가 버튼 */}
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{
              alignSelf: "flex-start",
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              "&:hover": { borderColor: theme.palette.primary.main },
            }}
          >
            필터추가
          </Button>
          {/* ✅ 필터 버튼 */}
          <Button variant="outlined" color="primary">
            연속 상승세
          </Button>
          <Button variant="outlined" color="primary">
            저평가 성장주
          </Button>
          <Button variant="outlined" color="primary">
            아직 저렴한 가치주
          </Button>
          <Button variant="outlined" color="primary">
            꾸준한 배당주
          </Button>
          <Button variant="outlined" color="primary">
            돈 잘버는 회사 찾기
          </Button>
          <Button variant="outlined" color="primary">
            저평가 탈출
          </Button>
          <Button variant="outlined" color="primary">
            미래의 배당왕 찾기
          </Button>
          <Button variant="outlined" color="primary">
            성장 기대주
          </Button>
          <Button variant="outlined" color="primary">
            쌍끌이 매수
          </Button>
          <Button variant="outlined" color="primary">
            고수익 저평가
          </Button>
          <Button variant="outlined" color="primary">
            안정 성장주
          </Button>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>카테고리</InputLabel>
            <Select
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem value="10조 이상">10조 이상</MenuItem>
              <MenuItem value="1조 이상">1조 이상</MenuItem>
              <MenuItem value="1천억 이상">1천억 이상</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
}
