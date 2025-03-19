import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDispatch } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { deletePost } from "../../services/deletePost";
import { removePost } from "../../slices/postsSlice";
import { useDeletePost } from "../useDeletePost";

vi.mock("../../services/deletePost.ts");
vi.mock("react-redux", () => ({
	useDispatch: vi.fn(),
}));

describe("useDeletePost hook", () => {
	const mockDispatch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// @ts-ignore
		useDispatch.mockReturnValue(mockDispatch);
	});

	it("should set state to 'loading' and then 'success' on successful post creation", async () => {
		const mockPost = { name: "Post Name", description: "Post Description" };
		// @ts-ignore
		deletePost.mockResolvedValue(mockPost);

		const { result } = renderHook(() => useDeletePost());

		act(() => {
			result.current.deletePost("123");
		});

		expect(result.current.state).toBe("loading");

		waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledTimes(1);
			expect(mockDispatch).toHaveBeenCalledWith(removePost(mockPost));
			expect(result.current.state).toBe("success");
		});
	});

	it("should set state to 'error' on failed post creation", async () => {
		// const mockPost = { name: "Post Name", description: "Post Description" };
		const mockError = new Error("Post deletion failed");
		// @ts-ignore
		deletePost.mockRejectedValue(mockError);

		const { result } = renderHook(() => useDeletePost());

		act(() => {
			result.current.deletePost("1234");
		});

		expect(result.current.state).toBe("loading");

		waitFor(() => {
			expect(mockDispatch).not.toHaveBeenCalled();
			expect(result.current.state).toBe("error");
		});
	});
});
