import { Box } from "@mui/material";
import {
  DataGrid,
  FilterColumnsArgs,
  GetColumnForNewFilterArgs,
  GridColDef,
  GridRowSelectionModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import StockScreenerSearch from "../(dashboard)/components/StockScreenerSearch";
import { fetchCompanyList } from "../utils/api";
// 서버에서 데이터를 가져오는 함수 타입 정의
interface DataResponse {
  rows: any[]; // 실제 데이터 형식에 맞게 수정 (예: { id: number, productName: string } 등)
  total: number; // 전체 데이터 수
}

// 페이지 모델 타입 정의
interface PaginationModel {
  page: number;
  pageSize: number;
}

// 🔹 API 응답 데이터 타입 정의
interface StockData {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string;
  industry: string;
  beta: number;
  price: number;
  lastAnnualDividend: number;
  volume: number;
  exchange: string;
}

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

export default function CustomizedDataGrid() {
  // 상태 정의
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [rows, setRows] = useState<GridRowsProp>([]); // 데이터 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [totalRows, setTotalRows] = useState<number>(0); // 전체 데이터 개수
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [filters, setFilters] = useState<ScreenerFilters>({});

  // 서버에서 데이터를 가져오는 함수
  // const loadServerRows = async (page: number, pageSize: number) => {
  //   setLoading(true);
  //   try {
  //     // fetchData 함수 호출, 페이지와 페이지 크기 전달
  //     const result: DataResponse = await fetchData(page, pageSize);
  //     setRows(result.rows); // 응답에서 rows 데이터를 설정
  //     setTotalRows(result.total); // 응답에서 total 데이터를 설정
  //   } catch (error) {
  //     console.error("데이터 로딩 실패", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const loadStockData = async (searchParams: ScreenerFilters) => {
    setLoading(true);
    try {
      const result: StockData[] = await fetchCompanyList(searchParams);
      setRows(result);
    } catch (error) {
      console.error("API 호출 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStockData(filters);
  }, [filters]);

  const columns: GridColDef[] = [
    { field: "symbol", headerName: "Symbol", flex: 1 },
    { field: "companyName", headerName: "Company Name", flex: 2 },
    { field: "marketCap", headerName: "Market Cap", flex: 1 },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "industry", headerName: "Industry", flex: 1 },
    { field: "beta", headerName: "Beta", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "lastAnnualDividend",
      headerName: "Last Annual Dividend",
      flex: 1,
    },
    { field: "volume", headerName: "Volume", flex: 1 },
    { field: "exchange", headerName: "Exchange", flex: 1 },
    { field: "exchangeShortName", headerName: "ExchangeShortName", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "isEtf", headerName: "IsEtf", flex: 1 },
    { field: "isFund", headerName: "IsFund", flex: 1 },
    { field: "isActivelyTrading", headerName: "IsActivelyTrading", flex: 1 },
  ];

  const filterColumns = ({
    field,
    columns,
    currentFilters,
  }: FilterColumnsArgs) => {
    // remove already filtered fields from list of columns
    const filteredFields = currentFilters?.map((item) => item.field);
    return columns
      .filter(
        (colDef) =>
          colDef.filterable &&
          (colDef.field === field || !filteredFields.includes(colDef.field))
      )
      .map((column) => column.field);
  };

  const getColumnForNewFilter = ({
    currentFilters,
    columns,
  }: GetColumnForNewFilterArgs) => {
    const filteredFields = currentFilters?.map(({ field }) => field);
    const columnForNewFilter = columns
      .filter(
        (colDef) => colDef.filterable && !filteredFields.includes(colDef.field)
      )
      .find((colDef) => colDef.filterOperators?.length);
    return columnForNewFilter?.field ?? null;
  };

  // 페이지 변경 시 데이터를 로드하는 useEffect
  // useEffect(() => {
  //   loadServerRows(paginationModel.page, paginationModel.pageSize);
  // }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <StockScreenerSearch onSearch={setFilters} />
      <DataGrid
        getRowId={(row) => row.symbol || `row-${Math.random()}`} // ✅ 고유 ID 생성
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 20]}
      />
    </Box>
  );
}
