import "@testing-library/jest-dom";
import { FormProps } from "@/types/FormProps";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "@/components/ui/provider";
import Form from "../Form";

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

describe("NewPost Form component", () => {
	const mockOnSubmit = vi.fn((e) => e.preventDefault());
	const mockRegister = vi.fn();

	const defaultProps: FormProps<{ name: string }> = {
		onSubmit: mockOnSubmit,
		register: mockRegister,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should take a snapshot", () => {
		const { asFragment } = render(
			<Provider>
				<Form {...defaultProps} />
			</Provider>,
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render the form with inputs and button", () => {
		render(
			<Provider>
				<Form {...defaultProps} />
			</Provider>,
		);

		expect(screen.getByTestId("name-search-input")).toBeInTheDocument();
		expect(screen.getByTestId("submit-button")).toBeInTheDocument();
	});

	it("should call onSubmit when the form is submitted", () => {
		render(
			<Provider>
				<Form {...defaultProps} />
			</Provider>,
		);

		fireEvent.submit(screen.getByRole("form"));

		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
	});

	it("should call register for each input", () => {
		render(
			<Provider>
				<Form {...defaultProps} />
			</Provider>,
		);

		expect(mockRegister).toHaveBeenCalledWith("name");
	});
});
