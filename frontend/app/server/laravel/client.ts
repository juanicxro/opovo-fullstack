import { env } from "@/app/env";
import {
  ApiResponse,
  CreateLaravelClientConfig,
  Fetcher,
  HttpMethod,
  LaravelClient,
  RequestConfig,
  RequestOptions,
} from "./types/types";
import { baseToUrl, buildHeaders, parseJsonOrNull } from "./helpers/helpers";

const createExecutor = (config: CreateLaravelClientConfig) => {
  const baseUrl = config.baseUrl;
  const fetcher: Fetcher = config.fetcher ?? fetch;
  const defaults: RequestInit = { cache: "no-store", ...config.defaults };

  return async function execute<T>(
    method: HttpMethod,
    path: string,
    options: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { token, body, init } = options;

    const response = await fetcher(baseToUrl(baseUrl, path), {
      ...defaults,
      ...init,
      method,
      headers: buildHeaders({
        token,
        body,
        defaults: defaults.headers,
        extra: init?.headers,
      }),
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    return {
      status: response.status,
      ok: response.ok,
      data: await parseJsonOrNull<T>(response),
      headers: response.headers,
    };
  };
};

export function createLaravelClient(
  config: CreateLaravelClientConfig
): LaravelClient {
  const execute = createExecutor(config);

  const request = <T>({ method, path, ...rest }: RequestOptions) =>
    execute<T>(method, path, rest);

  const byMethod =
    (method: HttpMethod) =>
    <T>(path: string, options?: RequestConfig) =>
      execute<T>(method, path, options);

  return {
    request,
    get: byMethod("GET"),
    post: byMethod("POST"),
    put: byMethod("PUT"),
    delete: byMethod("DELETE"),
  };
}

export const api = createLaravelClient({
  baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
});
