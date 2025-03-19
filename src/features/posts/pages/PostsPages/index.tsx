import { memo, useState } from "react";
import Table, { type ColumnFilters } from "@/features/posts/components/Table";
import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import styles from "./PostsPages.module.css";
import { Show, Stack } from "@chakra-ui/react";
import NewPostForm from "../../components/NewPostForm";
import SearchPostForm from "../../components/SearchPostForm";
import NoDataMessage from "../../components/NoDataMessage";

function PostsPages() {
	const { data } = useGetAllPosts();
	const [columnFilters, setColumnFilters] = useState<ColumnFilters>([]);

	return (
		<div className={styles.container}>
			<Stack gap="5">
				<Show when={data.length > 0} fallback={<NoDataMessage />}>
					<SearchPostForm onSearch={setColumnFilters} />
					<Table data={data} columnFilters={columnFilters} />
				</Show>
				<NewPostForm />
			</Stack>
		</div>
	);
}

export default memo(PostsPages);
