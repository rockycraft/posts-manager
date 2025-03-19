import { vi, describe, beforeEach, it, expect } from "vitest";
import { axiosInstance } from "@/utils/axiosInstance";
import { deletePost } from "@/features/posts/services/deletePost";
import { ServiceError } from "@/utils/errors/ServiceError";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { ValidationError } from "@/utils/errors/ValidationError";
import { AppError } from "@/utils/errors/AppError";

vi.mock("@/utils/axiosInstance", () => {
	return {
		axiosInstance: {
			delete: vi.fn(),
		},
	};
});

describe("deletePost Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should call axiosInstance.delete with the correct URL", async () => {
		const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
		const mockDelete = vi.fn().mockResolvedValue({
			data: {
				id: mockPostId,
				name: "Post Name",
				description: "Post Description",
			},
		});
		// @ts-ignore
		axiosInstance.delete.mockImplementation(mockDelete);

		await deletePost(mockPostId);

		expect(mockDelete).toHaveBeenCalledTimes(1);
		expect(mockDelete).toHaveBeenCalledWith(`/posts/${mockPostId}`);
	});

	it("should return the post data deleted", async () => {
		const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
		const mockPostDeleted = {
			id: mockPostId,
			name: "Post Name",
			description: "Post Description",
		};
		const mockDelete = vi.fn().mockResolvedValue({
			data: mockPostDeleted,
		});
		// @ts-ignore
		axiosInstance.delete.mockImplementation(mockDelete);

		const response = await deletePost(mockPostId);

		expect(mockDelete).toHaveBeenCalledTimes(1);
		expect(response).toEqual(mockPostDeleted);
	});

	it("should throw a ServiceError when an AxiosError occurs", async () => {
		try {
			const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
			const mockDelete = vi.fn().mockRejectedValue(new AxiosError());
			// @ts-ignore
			axiosInstance.delete.mockImplementation(mockDelete);

			await deletePost(mockPostId);
		} catch (error) {
			expect(error).toBeInstanceOf(ServiceError);
		}
	});

	it("should throw a ValidationError when an ZodError occurs", async () => {
		try {
			const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
			const mockDelete = vi.fn().mockRejectedValue(new ZodError([]));
			// @ts-ignore
			axiosInstance.delete.mockImplementation(mockDelete);

			await deletePost(mockPostId);
		} catch (error) {
			expect(error).toBeInstanceOf(ValidationError);
		}
	});

	it("should throw a AppError when an unhandled occurs", async () => {
		try {
			const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
			const mockDelete = vi.fn().mockRejectedValue(new Error());
			// @ts-ignore
			axiosInstance.delete.mockImplementation(mockDelete);

			await deletePost(mockPostId);
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
		}
	});
});
