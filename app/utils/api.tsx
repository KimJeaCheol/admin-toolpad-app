// api.ts
interface DataResponse {
  rows: any[]; // 실제 데이터 형식에 맞게 수정 (예: { id: number, productName: string } 등)
  total: number; // 전체 데이터 수
}

// api.tsx
export interface BarChartData {
  pageViews: number[];
  downloads: number[];
  conversions: number[];
}

export interface NewsItem {
  publishedDate: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

export interface SectorPerformance {
  sector: string;
  changesPercentage: number;
}

const BASE_URL = "http://localhost:3010/api/orders"; // 실제 API URL로 변경
const FMP_API_KEY = "ywVLzlNZQUBe3anS60CetWk2P1JXK2pO"; // Financial Modeling Prep API 키
const FMP_BASE_URL = "https://financialmodelingprep.com/api"; // Financial Modeling Prep API 주소

export const fetchData = async (
  page: number,
  pageSize: number
): Promise<DataResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}`
    );
    const data: DataResponse = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
    throw error;
  }
};

export const fetchBarChartData = async (): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3010/api/bar-chart-data");
    const data: BarChartData = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 로딩 실패:", error);
    throw error;
  }
};

/**
 * 특정 주식의 실시간 가격 조회
 * @param symbol 주식 티커 (예: 'AAPL', 'TSLA')
 */
export const fetchStockPrice = async (symbol: string) => {
  try {
    const response = await fetch(
      `${FMP_BASE_URL}/quote/${symbol}?apikey=${FMP_API_KEY}`
    );
    const data = await response.json();
    return data[0]; // 첫 번째 요소가 해당 주식의 정보
  } catch (error) {
    console.error("주식 가격 로딩 실패:", error);
    throw error;
  }
};

/**
 * 특정 주식의 재무제표 조회
 * @param symbol 주식 티커 (예: 'AAPL', 'GOOGL')
 */
export const fetchStockFinancials = async (symbol: string) => {
  try {
    const response = await fetch(
      `${FMP_BASE_URL}/income-statement/${symbol}?apikey=${FMP_API_KEY}`
    );
    const data = await response.json();
    return data; // 주어진 회사의 재무제표 리스트 반환
  } catch (error) {
    console.error("재무제표 로딩 실패:", error);
    throw error;
  }
};

/**
 * 최신 금융 뉴스 가져오기
 */
export const fetchMarketNews = async () => {
  try {
    console.log("fetchMarketNews");
    const response = await fetch(
      `${FMP_BASE_URL}/v4/general_news?page=0&apikey=${FMP_API_KEY}`
    );
    const data: NewsItem = await response.json();
    return data; // 뉴스 리스트 반환
  } catch (error) {
    console.error("시장 뉴스 로딩 실패:", error);
    throw error;
  }
};

/**
 * 최신 금융 뉴스 가져오기
 */
export const fetchSectorPerformance = async (
  date: string
): Promise<SectorPerformance[]> => {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/sector-performance?apikey=${FMP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: SectorPerformance[] = await response.json();
    return data;
  } catch (error) {
    console.error("섹터 성과 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
