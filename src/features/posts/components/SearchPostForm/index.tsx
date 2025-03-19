import { type Dispatch, memo, type SetStateAction, useCallback } from "react";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/types/Post";
import type { ColumnFilters } from "../Table";
import Form from "./Form";

const searchPostSchema = postSchema.omit({ id: true, description: true });

type SearchPostInput = z.infer<typeof searchPostSchema>;

type SearchPostFormProps = {
	onSearch: Dispatch<SetStateAction<ColumnFilters>>;
};

function SearchPostForm({ onSearch }: SearchPostFormProps) {
	const { register, handleSubmit } = useForm<SearchPostInput>({
		resolver: zodResolver(searchPostSchema),
	});

	const onSubmit = useCallback<SubmitHandler<SearchPostInput>>(
		(data) => {
			onSearch(() => [
				{
					id: "name",
					value: data.name,
				},
			]);
		},
		[onSearch],
	);

	return <Form onSubmit={handleSubmit(onSubmit)} register={register} />;
}

export default memo(SearchPostForm);
