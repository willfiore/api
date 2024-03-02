import type { Method } from "./call.js";
import ApiResponse from "./api_response.js";
export type Config = {
    origin: string;
    fetchFunction: FetchFunction;
};
export type FetchFunctionOpts = {
    url: string;
    method: Method;
    body?: string;
    headers?: {
        [key: string]: string;
    };
};
export type FetchFunction = (opts: FetchFunctionOpts) => Promise<ApiResponse | undefined>;
export declare const config: Config;
