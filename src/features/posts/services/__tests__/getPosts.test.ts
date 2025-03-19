import { vi, describe, beforeEach, it, expect } from "vitest";
import { axiosInstance } from "@/utils/axiosInstance";
import { ServiceError } from "@/utils/errors/ServiceError";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { ValidationError } from "@/utils/errors/ValidationError";
import { AppError } from "@/utils/errors/AppError";
import { getPosts } from "../getPosts";

vi.mock("@/utils/axiosInstance", () => {
	return {
		axiosInstance: {
			get: vi.fn(),
		},
	};
});

describe("getPosts Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should call axiosInstance.get with the correct URL", async () => {
		const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
		const mockData = [
			{
				id: mockPostId,
				name: "Post Name",
				description: "Post Description",
			},
		];
		const mockGet = vi.fn().mockResolvedValue({
			data: mockData,
		});
		// @ts-ignore
		axiosInstance.get.mockImplementation(mockGet);

		await getPosts();

		expect(mockGet).toHaveBeenCalledTimes(1);
		expect(mockGet).toHaveBeenCalledWith(`/posts`);
	});

	it("should return all posts", async () => {
		const mockPostId = "93301d23-ac4d-4fe4-8d0f-dac24707e1fc";
		const mockData = [
			{
				id: mockPostId,
				name: "Post Name",
				description: "Post Description",
			},
		];
		const mockGet = vi.fn().mockResolvedValue({
			data: mockData,
		});
		// @ts-ignore
		axiosInstance.get.mockImplementation(mockGet);

		const response = await getPosts();

		expect(mockGet).toHaveBeenCalledTimes(1);
		expect(response).toEqual(mockData);
	});

	it("should throw a ServiceError when an AxiosError occurs", async () => {
		try {
			const mockGet = vi.fn().mockRejectedValue(new AxiosError());
			// @ts-ignore
			axiosInstance.get.mockImplementation(mockGet);

			await getPosts();
		} catch (error) {
			expect(error).toBeInstanceOf(ServiceError);
		}
	});

	it("should throw a ValidationError when an ZodError occurs", async () => {
		try {
			const mockGet = vi.fn().mockRejectedValue(new ZodError([]));
			// @ts-ignore
			axiosInstance.get.mockImplementation(mockGet);

			await getPosts();
		} catch (error) {
			expect(error).toBeInstanceOf(ValidationError);
		}
	});

	it("should throw a AppError when an unhandled occurs", async () => {
		try {
			const mockGet = vi.fn().mockRejectedValue(new Error());
			// @ts-ignore
			axiosInstance.get.mockImplementation(mockGet);

			await getPosts();
		} catch (error) {
			expect(error).toBeInstanceOf(AppError);
		}
	});
});
