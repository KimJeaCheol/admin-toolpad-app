import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import * as React from "react";
import { fetchData } from "../../../utils/api"; // API 호출
import FilterBar from "./FilterBar"; // API 호출

interface Data {
  id: number;
  productName: string;
  status: string;
  totalOrders: number;
  revenue: string;
  avgOrderValue: string;
  processingTime: string;
}

type Order = "asc" | "desc";

export default function DashboardTable() {
  const [rows, setRows] = React.useState<Data[]>([]);
  const [filterText, setFilterText] = React.useState<string>("");
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("productName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // 서버에서 데이터 불러오기
  React.useEffect(() => {
    const loadServerRows = async () => {
      try {
        const result = await fetchData(0, 50);
        setRows(result.rows);
      } catch (error) {
        console.error("데이터 로딩 실패", error);
      }
    };
    loadServerRows();
  }, []);

  // 정렬 함수
  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // 필터링된 데이터 정렬
  const filteredRows = rows
    .filter(
      (row) =>
        row.productName.toLowerCase().includes(filterText.toLowerCase()) ||
        row.status.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    });

  // 페이지네이션 적용
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      {/* 상단 타이틀 및 필터 버튼 */}
      <FilterBar />
      {/* 테이블 */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {[
                { id: "productName", label: "검색된주식" },
                { id: "status", label: "현재가" },
                { id: "totalOrders", label: "등락류" },
                { id: "revenue", label: "카테고리" },
                { id: "avgOrderValue", label: "시가총액" },
                { id: "processingTime", label: "거래량" },
              ].map((column) => (
                <TableCell key={column.id} align="left">
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id as keyof Data)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.totalOrders}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell>{row.avgOrderValue}</TableCell>
                <TableCell>{row.processingTime}</TableCell>
              </TableRow>
            ))}
            {paginatedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 페이지네이션 */}
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
    </Paper>
  );
}
