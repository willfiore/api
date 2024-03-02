import ApiResponse from "./api_response.js";
export type Method = "GET" | "POST" | "PATCH" | "DELETE";
export type CallOpts<T> = {
    /** API path. The full URL will be prepended with `config.origin`. */
    path: string;
    method: Method;
    body?: string;
    headers?: {
        [key: string]: string;
    };
    /** Specify an origin. This overrides `config.origin`. */
    origin?: string;
    responseHandler: (response: ApiResponse) => PromiseLike<T | undefined>;
};
export type Result<T> = {
    kind: "success";
    data: T;
} | {
    kind: "http_error";
} | {
    kind: "unhandled_response";
    response: ApiResponse;
};
export declare function call<T>(opts: CallOpts<T>): Promise<Result<T>>;
