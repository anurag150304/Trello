import { Elysia, status } from "elysia";

export class CTError extends Error {
    status: number;
    toResponse() {
        return { error: this.message }
    }

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const errHandler = new Elysia({ name: "error-handler" })
    .error({ CTError })
    .onError(({ code, error }) => {

        return code === "UNKNOWN" ?
            status("Bad Request", { error: "An error occured..." }) :
            error;

    }).as("global")