import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDispatch } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { postPost } from "../../services/postPost";
import { useCreatePost } from "../useCreatePost";
import { createPost } from "../../slices/postsSlice";

vi.mock("../../services/postPost");
vi.mock("react-redux", () => ({
	useDispatch: vi.fn(),
}));

describe("useCreatePost hook", () => {
	const mockDispatch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// @ts-ignore
		useDispatch.mockReturnValue(mockDispatch);
	});

	it("should set state to 'loading' and then 'success' on successful post creation", async () => {
		const mockPost = { name: "Post Name", description: "Post Description" };
		// @ts-ignore
		postPost.mockResolvedValue(mockPost);

		const { result } = renderHook(() => useCreatePost());

		act(() => {
			result.current.create(mockPost);
		});

		expect(result.current.state).toBe("loading");

		waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledTimes(1);
			expect(mockDispatch).toHaveBeenCalledWith(createPost(mockPost));
			expect(result.current.state).toBe("success");
		});
	});

	it("should set state to 'error' on failed post creation", async () => {
		const mockPost = { name: "Post Name", description: "Post Description" };
		const mockError = new Error("Post creation failed");
		// @ts-ignore
		postPost.mockRejectedValue(mockError);

		const { result } = renderHook(() => useCreatePost());

		act(() => {
			result.current.create(mockPost);
		});

		expect(result.current.state).toBe("loading");

		waitFor(() => {
			expect(mockDispatch).not.toHaveBeenCalled();
			expect(result.current.state).toBe("error");
		});
	});
});
