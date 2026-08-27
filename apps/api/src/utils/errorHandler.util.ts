import { Elysia } from "elysia";

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
    .onError(({ code, error, status }) => {
        if (code === "CTError") {
            return status(error.status, {
                error: error.message
            });
        }

        if (code === "VALIDATION") {
            return status("Unprocessable Content", {
                error: "Validation failed",
                message: error.message
            });
        }

        if (code === "NOT_FOUND") {
            return status("Not Found", {
                error: "Resource not found",
                message: "The requested resource could not be found."
            });
        }

        console.error("Server Error:", error);

        return status("Bad Request", {
            error: "Something went wrong!",
            message: "Please try again later!"
        });
    }).as("global");