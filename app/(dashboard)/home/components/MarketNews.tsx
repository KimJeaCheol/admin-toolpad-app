import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { NewsItem, fetchMarketNews } from "../../../utils/api"; // API 모듈 사용

export default function MarketNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("📢 API 호출 시작");
    fetchMarketNews()
      .then((data) => {
        if (Array.isArray(data)) {
          setNews(data.slice(0, 4)); // 최신 뉴스 4개만 표시
        } else {
          setNews([]);
          console.error("API 응답이 예상과 다릅니다:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching market news:", err);
        setError("뉴스 데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#121212",
          p: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
          주요 뉴스
        </Typography>
        <Typography sx={{ color: "#999" }}>로딩 중...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          backgroundColor: "#121212",
          p: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
          주요 뉴스
        </Typography>
        <Typography sx={{ color: "red" }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#121212", p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
        주요 뉴스
      </Typography>
      <Grid container spacing={2} columns={12}>
        {news.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#999",
                    fontSize: "12px",
                    mb: 1,
                  }}
                >
                  {new Date(item.publishedDate).toLocaleString()}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    height: "3em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#aaa", display: "block", mt: 1 }}
                >
                  {item.site}
                </Typography>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "block",
                    mt: 1,
                    fontSize: "12px",
                    color: "#1e88e5",
                  }}
                >
                  자세히 보기
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
