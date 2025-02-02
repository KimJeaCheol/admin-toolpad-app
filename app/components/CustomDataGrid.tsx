import {
  DataGrid,
  FilterColumnsArgs,
  GetColumnForNewFilterArgs,
  GridRowSelectionModel,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { columns } from "../mocks/gridOrdersData";
import { fetchData } from "../utils/api";

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

  // 서버에서 데이터를 가져오는 함수
  const loadServerRows = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      // fetchData 함수 호출, 페이지와 페이지 크기 전달
      const result: DataResponse = await fetchData(page, pageSize);
      setRows(result.rows); // 응답에서 rows 데이터를 설정
      setTotalRows(result.total); // 응답에서 total 데이터를 설정
    } catch (error) {
      console.error("데이터 로딩 실패", error);
    } finally {
      setLoading(false);
    }
  };

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
  useEffect(() => {
    loadServerRows(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        rowCount={totalRows} // 전체 데이터 수
        paginationMode="server" // 서버 측 페이지네이션 모드
        onPaginationModelChange={setPaginationModel} // 페이지 모델 변경 처리
        paginationModel={paginationModel} // 현재 페이지 모델
        onRowSelectionModelChange={(
          newRowSelectionModel: GridRowSelectionModel
        ) => {
          setRowSelectionModel(newRowSelectionModel); // 선택된 행 상태 업데이트
        }}
        rowSelectionModel={rowSelectionModel} // 선택된 행 상태
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        keepNonExistentRowsSelected
        sx={(theme) => ({
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : theme.palette.grey[200],
          "& .MuiDataGrid-cell": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[200],
          },
        })}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        loading={loading} // 로딩 상태
        density="compact"
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              filterColumns,
            },
            getColumnForNewFilter,
          },
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
      />
    </div>
  );
}
