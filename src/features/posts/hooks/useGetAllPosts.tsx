import type { RootState } from "@/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getPosts } from "../services/getPosts";
import { addPosts } from "../slices/postsSlice";
import type { State } from "@/types/State";

export function useGetAllPosts() {
	const [state, setState] = useState<State>("idle");
	const initialized = useRef(false);
	const posts = useSelector(
		(state: RootState) => state.posts.posts,
		shallowEqual,
	);
	const dispatch = useDispatch();

	const getAllPosts = useCallback(async () => {
		try {
			setState("loading");
			const response = await getPosts();
			dispatch(addPosts(response));
			setState("success");
		} catch (error) {
			setState("error");
			console.error(error);
		}
	}, [dispatch]);

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;

			getAllPosts();
		}
	}, [getAllPosts]);

	return { data: posts, state, getAllPosts };
}
