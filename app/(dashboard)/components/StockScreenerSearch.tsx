import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

// 🔹 검색 필터 타입 정의
interface ScreenerFilters {
  marketCapMoreThan?: number;
  marketCapLowerThan?: number;
  sector?: string;
  industry?: string;
  betaMoreThan?: number;
  betaLowerThan?: number;
  priceMoreThan?: number;
  priceLowerThan?: number;
  dividendMoreThan?: number;
  dividendLowerThan?: number;
  volumeMoreThan?: number;
  volumeLowerThan?: number;
  exchange?: string;
  country?: string;
  isEtf?: boolean;
  isFund?: boolean;
  isActivelyTrading?: boolean;
  limit?: number;
  includeAllShareClasses?: boolean;
}

// 🔹 Props 타입 정의
interface StockScreenerSearchProps {
  onSearch: (filters: ScreenerFilters) => void;
}

const StockScreenerSearch: React.FC<StockScreenerSearchProps> = ({
  onSearch,
}) => {
  const [filters, setFilters] = useState<ScreenerFilters>({
    marketCapMoreThan: undefined,
    marketCapLowerThan: undefined,
    sector: "",
    industry: "",
    betaMoreThan: undefined,
    betaLowerThan: undefined,
    priceMoreThan: undefined,
    priceLowerThan: undefined,
    dividendMoreThan: undefined,
    dividendLowerThan: undefined,
    volumeMoreThan: undefined,
    volumeLowerThan: undefined,
    exchange: "",
    country: "",
    isEtf: true,
    isFund: true,
    isActivelyTrading: true,
    limit: 10,
    includeAllShareClasses: undefined,
  });

  // 🔹 입력 필드 값 변경 핸들러
  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: any }>
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]:
        event.target.value === "" ? undefined : event.target.value, // 빈 값이면 undefined 처리
    }));
  };

  // 🔹 Select 요소 값 변경 핸들러
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;

    // ✅ boolean 값 변환 (true/false 값이 필요한 경우)
    const booleanFields = ["isEtf", "isFund", "isActivelyTrading"];
    const parsedValue = booleanFields.includes(name) ? value === "true" : value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: parsedValue,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} columns={12}>
        {" "}
        {/* ✅ Grid2 API 적용 */}
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Market Cap More Than"
            name="marketCapMoreThan"
            type="number"
            fullWidth
            value={filters.marketCapMoreThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Market Cap Lower Than"
            name="marketCapLowerThan"
            type="number"
            fullWidth
            value={filters.marketCapLowerThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Sector"
            name="sector"
            fullWidth
            value={filters.sector}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Industry"
            name="industry"
            fullWidth
            value={filters.industry}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Beta More Than"
            name="betaMoreThan"
            type="number"
            fullWidth
            value={filters.betaMoreThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Beta Lower Than"
            name="betaLowerThan"
            type="number"
            fullWidth
            value={filters.betaLowerThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Price More Than"
            name="priceMoreThan"
            type="number"
            fullWidth
            value={filters.priceMoreThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Price Lower Than"
            name="priceLowerThan"
            type="number"
            fullWidth
            value={filters.priceLowerThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Dividend More Than"
            name="dividendMoreThan"
            type="number"
            fullWidth
            value={filters.dividendMoreThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Dividend Lower Than"
            name="dividendLowerThan"
            type="number"
            fullWidth
            value={filters.dividendLowerThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Volume More Than"
            name="volumeMoreThan"
            type="number"
            fullWidth
            value={filters.volumeMoreThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Volume Lower Than"
            name="volumeLowerThan"
            type="number"
            fullWidth
            value={filters.volumeLowerThan || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Exchange"
            name="exchange"
            fullWidth
            value={filters.exchange}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Country"
            name="country"
            fullWidth
            value={filters.country}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Select
            name="isEtf"
            fullWidth
            value={filters.isEtf ? "true" : "false"}
            onChange={handleSelectChange}
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Select
            name="isFund"
            fullWidth
            value={filters.isFund ? "true" : "false"}
            onChange={handleSelectChange}
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Select
            name="isActivelyTrading"
            fullWidth
            value={filters.isActivelyTrading ? "true" : "false"}
            onChange={handleSelectChange}
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <TextField
            label="Limit"
            name="limit"
            type="number"
            fullWidth
            value={filters.limit || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        fullWidth
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default StockScreenerSearch;
