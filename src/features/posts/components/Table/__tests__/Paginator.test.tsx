import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Paginator } from "../Paginator";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "@/components/ui/provider";

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

describe("Paginator component", () => {
	const mockOnClickPrevious = vi.fn();
	const mockOnClickNext = vi.fn();

	const defaultProps = {
		actualPage: 1,
		totalPages: 5,
		canPreviousPage: true,
		canNextPage: true,
		onClickPrevious: mockOnClickPrevious,
		onClickNext: mockOnClickNext,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render the paginator with correct text", () => {
		render(
			<Provider>
				<Paginator {...defaultProps} />
			</Provider>,
		);

		expect(screen.getByTestId("page-detail")).toBeInTheDocument();
	});

	it("should call onClickPrevious when previous button is clicked", () => {
		render(
			<Provider>
				<Paginator {...defaultProps} />
			</Provider>,
		);

		fireEvent.click(screen.getByTestId("previous-button"));

		expect(mockOnClickPrevious).toHaveBeenCalledTimes(1);
	});

	it("should call onClickNext when next button is clicked", () => {
		render(
			<Provider>
				<Paginator {...defaultProps} />
			</Provider>,
		);

		fireEvent.click(screen.getByTestId("next-button"));

		expect(mockOnClickNext).toHaveBeenCalledTimes(1);
	});

	it("should disable previous button when canPreviousPage is false", () => {
		render(
			<Provider>
				<Paginator {...defaultProps} canPreviousPage={false} />
			</Provider>,
		);

		expect(screen.getByTestId("previous-button")).toBeDisabled();
	});

	it("should disable next button when canNextPage is false", () => {
		render(
			<Provider>
				<Paginator {...defaultProps} canNextPage={false} />
			</Provider>,
		);

		expect(screen.getByTestId("next-button")).toBeDisabled();
	});

	it("should match snapshot", () => {
		const { asFragment } = render(
			<Provider>
				<Paginator {...defaultProps} />
			</Provider>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
