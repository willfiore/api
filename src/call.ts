import ApiResponse from "./api_response.js";
import { config } from "./config.js";

export type Method =
    | "GET"
    | "POST"
    | "PATCH"
    | "DELETE";

export type CallOpts<T> = {
    /** API path. The full URL will be prepended with `config.origin`. */
    path: string,

    method: Method,
    body?: string,
    headers?: { [key: string]: string },

    /** Specify an origin. This overrides `config.origin`. */
    origin?: string,

    responseHandler: (response: ApiResponse) => PromiseLike<T | undefined>,
}

export type Result<T> =
| { kind: "success", data: T }
| { kind: "http_error" }
| { kind: "unhandled_response", response: ApiResponse };

export async function call<T>(opts: CallOpts<T>): Promise<Result<T>> {
    const headers = opts.headers ?? {};

    if (opts.body !== undefined) {
        headers["content-type"] = "application/json";
    }

    const origin = opts.origin ?? config.origin.replace(/\/$/, "");
    const path = opts.path.replace(/^\/|\/$/g, "");
    const url = `https://${origin}/${path}`;

    const fetchResponse = await config.fetchFunction({
        url,
        method: opts.method,
        body: opts.body,
        headers: headers,
    });

    if (fetchResponse === undefined) {
        return { kind: "http_error" };
    }

    const data = await opts.responseHandler(fetchResponse);

    if (data === undefined) {
        return {
            kind: "unhandled_response",
            response: fetchResponse,
        }
    }

    return { kind: "success", data };
}
