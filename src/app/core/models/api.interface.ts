export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ApiError {
  status_message: string;
  status_code: number;
}
