import { ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

type PaginatorProps = {
	actualPage: number;
	totalPages: number;
	canPreviousPage: boolean;
	canNextPage: boolean;
	onClickPrevious: () => void;
	onClickNext: () => void;
};

export function Paginator({
	actualPage,
	totalPages,
	canPreviousPage,
	canNextPage,
	onClickPrevious,
	onClickNext,
}: PaginatorProps) {
	return (
		<ButtonGroup>
			<Text data-testid="page-detail">{`Página ${actualPage} de ${totalPages}`}</Text>
			<IconButton
				data-testid="previous-button"
				variant="outline"
				onClick={onClickPrevious}
				disabled={!canPreviousPage}
			>
				<HiChevronLeft />
			</IconButton>
			<IconButton
				data-testid="next-button"
				variant="outline"
				onClick={onClickNext}
				disabled={!canNextPage}
			>
				<HiChevronRight />
			</IconButton>
		</ButtonGroup>
	);
}
