import type { Static, TSchema } from "@sinclair/typebox";
export type ResponseOpts = {
    status: number;
    body?: string;
};
export declare class Response {
    readonly status: number;
    private body?;
    constructor(opts: ResponseOpts);
    json<T extends TSchema>(schema: T): Static<T> | undefined;
}
export default Response;
