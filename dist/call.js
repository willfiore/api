import { config } from "./config.js";
export async function call(opts) {
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
        };
    }
    return { kind: "success", data };
}
//# sourceMappingURL=call.js.map