import ApiResponse from "./api_response.js";
export type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type ApiOpts<T> = {
    /** API path. The full URL will be prepended with `config.origin`. */
    path: string;
    method: ApiMethod;
    body?: string;
    headers?: {
        [key: string]: string;
    };
    /** Specify an origin. This overrides `config.origin`. */
    origin?: string;
    responseHandler: (response: ApiResponse) => PromiseLike<T | undefined>;
};
export type ApiResult<T> = {
    kind: "success";
    data: T;
} | {
    kind: "http_error";
} | {
    kind: "unhandled_response";
    response: ApiResponse;
};
export declare function api<T>(opts: ApiOpts<T>): Promise<ApiResult<T>>;
