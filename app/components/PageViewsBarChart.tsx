import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { BarChartData, fetchBarChartData } from "../utils/api";

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];
  const [chartData, setChartData] = useState<BarChartData>({
    pageViews: [0],
    downloads: [0],
    conversions: [0],
  }); // 초기값은 null

  useEffect(() => {
    const getData = async () => {
      console.log("Fetching data..."); // API 호출 시작 확인용
      const data: BarChartData = await fetchBarChartData();
      setChartData(data);
    };

    getData();
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Page views and downloads
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Page views and downloads for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: "band",
                categoryGapRatio: 0.5,
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              },
            ] as any
          }
          series={[
            {
              id: "page-views",
              label: "Page views",
              data: chartData.pageViews, // null 체크 후 기본 빈 배열 사용
              stack: "A",
            },
            {
              id: "downloads",
              label: "Downloads",
              data: chartData.downloads, // null 체크 후 기본 빈 배열 사용
              stack: "A",
            },
            {
              id: "conversions",
              label: "Conversions",
              data: chartData.conversions, // null 체크 후 기본 빈 배열 사용
              stack: "A",
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
