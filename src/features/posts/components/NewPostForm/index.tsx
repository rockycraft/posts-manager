import type { z } from "zod";
import { postSchema } from "@/types/Post";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "../../hooks/useCreatePost";
import { memo, useCallback, useEffect } from "react";
import Form from "./Form";
import { Toaster, toaster } from "@/components/ui/toaster";

const newPostSchema = postSchema.omit({ id: true });

type NewPostInput = z.infer<typeof newPostSchema>;

function NewPostForm() {
	const { register, handleSubmit, reset } = useForm<NewPostInput>({
		resolver: zodResolver(newPostSchema),
	});
	const { create, state } = useCreatePost();

	useEffect(() => {
		if (state === "error") {
			toaster.create({
				title: "Ocurrió un error al crear el post",
				type: "error",
			});
		}
	}, [state]);

	const onSubmit = useCallback<SubmitHandler<NewPostInput>>(
		(data) => {
			create(data);
			reset();
		},
		[create, reset],
	);

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)} register={register} />
			<Toaster />
		</>
	);
}

export default memo(NewPostForm);
