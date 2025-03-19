import type { Post } from "@/types/Post";
import { createSlice } from "@reduxjs/toolkit";

export interface PostsState {
	posts: Post[];
}

const initialState: PostsState = {
	posts: [],
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPosts: (state, action) => {
			state.posts = [...action.payload];
		},
		createPost: (state, action) => {
			state.posts = [...state.posts, action.payload];
		},
		removePost: (state, action) => {
			state.posts = state.posts.filter((post) => post.id !== action.payload);
		},
	},
});

export const { addPosts, createPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
