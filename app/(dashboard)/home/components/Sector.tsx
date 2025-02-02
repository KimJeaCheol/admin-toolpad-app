import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs"; // dayjs 추가
import React, { useEffect, useState } from "react";
import { SectorPerformance, fetchSectorPerformance } from "../../../utils/api"; // API 모듈 사용

// 아이콘 매핑 (샘플)
const sectorIcons: { [key: string]: string } = {
  "Education Services": "✏️",
  Education: "🎓",
  Drone: "🚁",
  Technology: "💻",
  Healthcare: "🏥",
  Finance: "💰",
};

export default function SectorList() {
  const [sectors, setSectors] = useState<SectorPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  // 현재 날짜 및 시간 설정
  const todayDate = dayjs().format("YYYY-MM-DD"); // API 요청용 날짜
  const displayDate = dayjs().format("M월 D일 HH:mm 기준"); // UI 표시용 날짜 (예: 2월 2일 08:30 기준)

  useEffect(() => {
    fetchSectorPerformance(todayDate)
      .then((data) => {
        setSectors(
          data.sort((a, b) => b.changesPercentage - a.changesPercentage)
        ); // 변동률 높은 순 정렬
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터 로딩 실패:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Typography sx={{ color: "#999", textAlign: "center" }}>
        로딩 중...
      </Typography>
    );
  }

  return (
    <Box
      sx={{ backgroundColor: "#121212", p: 3, borderRadius: 2, color: "#fff" }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        해외{" "}
        <span style={{ color: "#999", fontSize: "14px" }}>{displayDate}</span>
      </Typography>
      <List>
        {sectors.slice(0, 3).map((sector, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#1e1e1e", fontSize: "20px" }}>
                  {sectorIcons[sector.sector] || "📈"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    <span
                      style={{
                        color:
                          index === 0 ? "gold" : index === 1 ? "blue" : "red",
                      }}
                    >
                      {index + 1}위
                    </span>{" "}
                    {sector.sector}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: "#aaa", fontSize: "14px" }}>
                    평균 변동률:{" "}
                    <span
                      style={{
                        color: sector.changesPercentage > 0 ? "red" : "blue",
                      }}
                    >
                      {sector.changesPercentage}
                    </span>
                  </Typography>
                }
              />
            </ListItem>
            {index < 2 && <Divider sx={{ backgroundColor: "#333" }} />}{" "}
            {/* 마지막 항목 제외 구분선 */}
          </React.Fragment>
        ))}
      </List>
      <Typography
        sx={{ textAlign: "right", mt: 2, color: "#1e88e5", cursor: "pointer" }}
      >
        더 보기
      </Typography>
    </Box>
  );
}
