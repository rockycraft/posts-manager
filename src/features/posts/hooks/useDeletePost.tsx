import type { State } from "@/types/State";
import { useState } from "react";
import { deletePost as deletePostService } from "../services/deletePost";
import { useDispatch } from "react-redux";
import { removePost } from "../slices/postsSlice";
import { Post } from "@/types/Post";

export function useDeletePost() {
	const [state, setState] = useState<State>("idle");
	const dispatch = useDispatch();

	async function deletePost(id: Post["id"]) {
		try {
			setState("loading");
			//@ts-ignore
			const response = await deletePostService(id);
			dispatch(removePost(response.id));
			setState("success");
		} catch (error) {
			console.error(error);
			setState("error");
		}
	}

	return { deletePost, state };
}
