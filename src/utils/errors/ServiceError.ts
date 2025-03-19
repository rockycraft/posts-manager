import { AppError } from "./AppError";

interface ServiceErrorDetails {
	statusCode?: number;
	endpoint?: string;
}

export class ServiceError extends AppError {
	originalError: unknown;
	isNetworkError: boolean;
	statusCode: number | null;
	endpoint: string | null;

	constructor(
		message: string,
		code = "SERVICE_ERROR",
		details: ServiceErrorDetails = {},
		originalError: unknown = null,
	) {
		super(message, "ServiceError", code, details);
		this.originalError = originalError;
		this.isNetworkError = false;
		this.statusCode = details.statusCode || null;
		this.endpoint = details.endpoint || null;
	}
}
