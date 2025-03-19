import { vi, describe, beforeEach, it, expect } from "vitest";
import { axiosInstance } from "@/utils/axiosInstance";
import { ServiceError } from "@/utils/errors/ServiceError";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { ValidationError } from "@/utils/errors/ValidationError";
import { AppError } from "@/utils/errors/AppError";
import { postPost } from "../postPost";

vi.mock("@/utils/axiosInstance", () => {
	return {
		axiosInstance: {
			post: vi.fn(),
		},
	};
});

describe("postPost Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should call axiosInstance.post with the correct URL and body", async () => {
		const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
		const mockData = {
			id: mockPostId,
			name: "Post Name",
			description: "Post Description",
		};
		const mockPost = vi.fn().mockResolvedValue({
			data: mockData,
		});
		// @ts-ignore
		axiosInstance.post.mockImplementation(mockPost);

		await postPost(mockData);

		expect(mockPost).toHaveBeenCalledTimes(1);
		expect(mockPost).toHaveBeenCalledWith(`/posts`, mockData);
	});

	it("should return the post created", async () => {
		const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
		const mockData = {
			id: mockPostId,
			name: "Post Name",
			description: "Post Description",
		};
		const mockPost = vi.fn().mockResolvedValue({
			data: mockData,
		});
		// @ts-ignore
		axiosInstance.post.mockImplementation(mockPost);

		const response = await postPost(mockData);

		expect(mockPost).toHaveBeenCalledTimes(1);
		expect(response).toEqual(mockData);
	});

	it("should throw a ServiceError when an AxiosError occurs", async () => {
		try {
			const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
			const mockData = {
				id: mockPostId,
				name: "Post Name",
				description: "Post Description",
			};
			const mockPost = vi.fn().mockRejectedValue(new AxiosError());
			// @ts-ignore
			axiosInstance.post.mockImplementation(mockPost);

			await postPost(mockData);
		} catch (error) {
			expect(error).toBeInstanceOf(ServiceError);
		}
	});

	it("should throw a ValidationError when an ZodError occurs", async () => {
		try {
			const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
			const mockData = {
				id: mockPostId,
				name: "Post Name",
				description: "Post Description",
			};
			const mockPost = vi.fn().mockRejectedValue(new ZodError([]));
			// @ts-ignore
			axiosInstance.post.mockImplementation(mockPost);

			await postPost(mockData);
		} catch (error) {
			expect(error).toBeInstanceOf(ValidationError);
		}
	});

	it("should throw a AppError when an unhandled occurs", async () => {
		try {
			const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
			const mockData = {
				id: mockPostId,
				name: "Post Name",
				description: "Post Description",
			};
			const mockPost = vi.fn().mockRejectedValue(new Error());
			// @ts-ignore
			axiosInstance.post.mockImplementation(mockPost);

			await postPost(mockData);
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
		}
	});
});
