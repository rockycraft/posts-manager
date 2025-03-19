export class AppError extends Error {
	code: string;
	details: unknown;
	timestamp: string;

	constructor(
		message: string,
		name: string,
		code = "APP_ERROR",
		details: unknown = {},
	) {
		super(message);
		this.name = name;
		this.code = code;
		this.details = details;
		this.timestamp = new Date().toISOString();

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppError);
		}
	}
}
