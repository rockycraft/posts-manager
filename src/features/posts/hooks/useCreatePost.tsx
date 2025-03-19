import type { State } from "@/types/State";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../slices/postsSlice";
import { postPost } from "../services/postPost";
import type { Post } from "@/types/Post";

export function useCreatePost() {
	const [state, setState] = useState<State>("idle");
	const dispatch = useDispatch();

	const create = useCallback(
		async (post: Omit<Post, "id">) => {
			try {
				setState("loading");
				const response = await postPost(post);
				dispatch(createPost(response));
				setState("success");
			} catch (error) {
				setState("error");
			}
		},
		[dispatch],
	);

	return { create, state };
}
