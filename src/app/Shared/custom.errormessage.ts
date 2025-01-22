
export class CustomErrorHandler {

    static handleError(error: any): string {
        switch (error?.status) {
            case 401:
                return "Unauthorized access - 401.";
            case 404:
                return "Resource not found - 404.";
            case 400:
                if (error?.error?.errors) {
                    // Extract validation error messages from error.error.errors
                    const validationMessages = Object.entries(error.error.errors)
                        .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
                        .join("\n");

                    return validationMessages;
                } else if (error?.error?.title) {
                    return error.error.title;
                } else {
                    return "Bad request - 400.";
                }
            default:
                return "An unexpected error occurred: " + (error?.message || "Unknown error");
        }
    }
}