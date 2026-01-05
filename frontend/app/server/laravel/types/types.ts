export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export type ApiResponse<T> = {
  status: number;
  ok: boolean;
  data: T | null;
  headers: Headers;
};

export type RequestConfig = {
  token?: string;
  body?: unknown;
  init?: RequestInit;
};

export type RequestOptions = RequestConfig & {
  method: HttpMethod;
  path: string;
};

export type CreateLaravelClientConfig = {
  baseUrl: string;
  fetcher?: Fetcher;
  defaults?: RequestInit;
};

export type LaravelClient = {
  request<T>(options: RequestOptions): Promise<ApiResponse<T>>;
  get<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  put<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  delete<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>>;
};
