import { AppError } from "./AppError";

export class ValidationError extends AppError {
	fieldErrors: { [key: string]: string }[];

	constructor(
		message: string,
		fieldErrors: { [key: string]: string }[],
		code = "VALIDATION_ERROR",
	) {
		super(message, "ValidationError", code, { fieldErrors });
		this.fieldErrors = fieldErrors;
	}
}
