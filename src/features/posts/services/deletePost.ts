import { Post, postSchema } from "@/types/Post";
import { axiosInstance } from "@/utils/axiosInstance";
import { AppError } from "@/utils/errors/AppError";
import { ServiceError } from "@/utils/errors/ServiceError";
import { ValidationError } from "@/utils/errors/ValidationError";
import { AxiosError } from "axios";
import { ZodError } from "zod";

export async function deletePost(id: Post["id"]) {
	try {
		const response = await axiosInstance.delete(`/posts/${id}`);
		const data = await postSchema.parseAsync(response.data);

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new ServiceError(
				error.message,
				"SERVICE_ERROR",
				{
					statusCode: error.status,
					endpoint: error.config?.url,
				},
				error,
			);
		}
		if (error instanceof ZodError) {
			throw new ValidationError(
				"Invalid response data.",
				error.issues.map((issue) => ({
					[issue.path[0]]: issue.message,
				})),
				"INVALID_RESPONSE_DATA",
			);
		}
		throw new AppError(
			"An error occurred while calling the API.",
			"DELETE_POST_ERROR",
			"APP_ERROR",
			error,
		);
	}
}
