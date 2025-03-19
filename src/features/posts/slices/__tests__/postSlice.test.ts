import { describe, expect, it } from "vitest";
import postReducer, {
	addPosts,
	createPost,
	removePost,
	type PostsState,
} from "../postsSlice";
import { Post } from "@/types/Post";

describe("postSlice", () => {
	const initialState: PostsState = {
		posts: [],
	};

	it("should handle initial state", () => {
		expect(postReducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle addPosts", () => {
		const mockPosts: Post[] = [
			{ id: "1", name: "Post 1", description: "Body 1" },
			{ id: "2", name: "Post 2", description: "Body 2" },
		];
		const actual = postReducer(initialState, addPosts(mockPosts));
		expect(actual.posts).toEqual(mockPosts);
	});

	it("should handle createPost", () => {
		const mockPosts: Post = { id: "1", name: "Post 1", description: "Body 1" };

		const actual = postReducer(initialState, createPost(mockPosts));
		expect(actual.posts).toEqual([mockPosts]);
	});

	it("should handle removePosts", () => {
		const initialStateWithPosts: PostsState = {
			posts: [
				{ id: "1", name: "Post 1", description: "Body 1" },
				{ id: "2", name: "Post 2", description: "Body 2" },
			],
		};

		const actual = postReducer(initialStateWithPosts, removePost("1"));
		expect(actual.posts).toEqual([
			{ id: "2", name: "Post 2", description: "Body 2" },
		]);
	});
});
