import type { Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export type ResponseOpts = {
    status: number,
    body?: string,
}

export class Response {
    readonly status: number;
    private body?: string;

    constructor(opts: ResponseOpts) {
        this.status = opts.status;
        this.body = opts.body;
    }

    json<T extends TSchema>(schema: T): Static<T> | undefined {
        let raw: unknown;

        if (this.body === undefined) {
            return undefined;
        }

        try {
            raw = JSON.parse(this.body);
        } catch (err: unknown) {
            // console.error('Failed to parse response JSON');
            return undefined;
        }

        const errors = [...Value.Errors(schema, raw)];

        if (errors.length > 0) {
            // console.error('Failed to parse response schema:');
            // console.error(JSON.stringify(errors, null, 2));

            return undefined;
        }

        return raw;
    }
}

export default Response
