import type { ColumnDef } from "@tanstack/react-table";
import { DeleteButton } from "./DeleteButton";
import type { Post } from "@/types/Post";

export const COLUMNS: ColumnDef<Post>[] = [
	// {
	// 	header: "ID",
	// 	accessorKey: "id",
	// 	enableHiding: true,
	// },
	{
		header: "Nombre",
		accessorKey: "name",
	},
	{
		header: "Descripción",
		accessorKey: "description",
	},
	{
		header: "Acciones",
		accessorKey: "id",
		cell: ({ row }) => <DeleteButton id={row.original.id} />,
	},
];
