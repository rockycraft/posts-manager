import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDispatch } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { getPosts } from "../../services/getPosts";
import { addPosts } from "../../slices/postsSlice";
import { useGetAllPosts } from "../useGetAllPosts";

vi.mock("../../services/getPosts.ts");
vi.mock("react-redux", () => ({
	useDispatch: vi.fn(),
	useSelector: vi.fn(),
	shallowEqual: vi.fn(),
}));

describe("useGetAllPosts hook", () => {
	const mockDispatch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// @ts-ignore
		useDispatch.mockReturnValue(mockDispatch);
	});

	it("should set state to 'loading' and then 'success' on successful post creation", async () => {
		const mockPosts = [{ name: "Post Name", description: "Post Description" }];
		// @ts-ignore
		getPosts.mockResolvedValue(mockPosts);

		const { result } = renderHook(() => useGetAllPosts());

		act(() => {
			result.current.getAllPosts();
		});

		expect(result.current.state).toBe("loading");

		waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledTimes(1);
			expect(mockDispatch).toHaveBeenCalledWith(addPosts(mockPosts));
			expect(result.current.state).toBe("success");
		});
	});

	it("should set state to 'error' on failed post creation", async () => {
		// const mockPost = { name: "Post Name", description: "Post Description" };
		const mockError = new Error("Post deletion failed");
		// @ts-ignore
		getPosts.mockRejectedValue(mockError);

		const { result } = renderHook(() => useGetAllPosts());

		act(() => {
			result.current.getAllPosts();
		});

		expect(result.current.state).toBe("loading");

		waitFor(() => {
			expect(mockDispatch).not.toHaveBeenCalled();
			expect(result.current.state).toBe("error");
		});
	});
});
