import { Button } from "@chakra-ui/react";
import { useDeletePost } from "../../hooks/useDeletePost";
import { HiTrash } from "react-icons/hi";
import { useCallback } from "react";
import type { Post } from "@/types/Post";

type DeleteButtonProps = {
	id: Post["id"];
};

export function DeleteButton({ id }: DeleteButtonProps) {
	const { deletePost } = useDeletePost();

	const handleClick = useCallback(() => {
		deletePost(id);
	}, [deletePost, id]);

	return (
		<Button
			data-testid="delete-post=button"
			colorPalette="red"
			onClick={handleClick}
		>
			<HiTrash />
			Eliminar
		</Button>
	);
}
