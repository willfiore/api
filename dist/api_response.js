import { Value } from "@sinclair/typebox/value";
export class Response {
    status;
    body;
    constructor(opts) {
        this.status = opts.status;
        this.body = opts.body;
    }
    json(schema) {
        let raw;
        if (this.body === undefined) {
            return undefined;
        }
        try {
            raw = JSON.parse(this.body);
        }
        catch (err) {
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
export default Response;
//# sourceMappingURL=api_response.js.map