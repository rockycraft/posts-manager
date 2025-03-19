import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { Table as CTable, Stack } from "@chakra-ui/react";
import { COLUMNS } from "./columns";
import type { Post } from "@/types/Post";
import { Paginator } from "./Paginator";

type ColumnFilter = { id: Post["id"]; value: string };
export type ColumnFilters = ColumnFilter[] | [];

type TableProps = {
	data: Post[];
	columnFilters: ColumnFilters;
};

function Table({ data, columnFilters = [] }: TableProps) {
	const columns = useMemo(() => COLUMNS, []);
	const {
		getHeaderGroups,
		getRowModel,
		getState,
		getPageCount,
		previousPage,
		getCanPreviousPage,
		nextPage,
		getCanNextPage,
	} = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getRowId: (row) => row.id,
		state: {
			columnFilters,
		},
	});

	const handlePreviousPage = useCallback(() => {
		previousPage();
	}, [previousPage]);

	const handleNextPage = useCallback(() => {
		nextPage();
	}, [nextPage]);

	return (
		<Stack gap="5">
			<CTable.ScrollArea borderWidth="1px" maxH="md">
				<CTable.Root size="md" stickyHeader>
					<CTable.Header>
						{getHeaderGroups().map((headerGroup) => (
							<CTable.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<CTable.ColumnHeader key={header.id}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</CTable.ColumnHeader>
								))}
							</CTable.Row>
						))}
					</CTable.Header>
					<CTable.Body>
						{getRowModel().rows.map((row) => (
							<CTable.Row key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<CTable.Cell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</CTable.Cell>
								))}
							</CTable.Row>
						))}
					</CTable.Body>
				</CTable.Root>
			</CTable.ScrollArea>
			<Paginator
				actualPage={getState().pagination.pageIndex + 1}
				totalPages={getPageCount()}
				canPreviousPage={getCanPreviousPage()}
				canNextPage={getCanNextPage()}
				onClickPrevious={handlePreviousPage}
				onClickNext={handleNextPage}
			/>
		</Stack>
	);
}

export default memo(Table);
