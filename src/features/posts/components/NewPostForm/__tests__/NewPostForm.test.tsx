import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NewPostForm from "../index";
import { useCreatePost } from "../../../hooks/useCreatePost";
import { toaster } from "@/components/ui/toaster";
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

vi.mock("../../../hooks/useCreatePost");
vi.mock("@/components/ui/toaster", () => ({
	Toaster: () => <div>Toaster</div>,
	toaster: {
		create: vi.fn(),
	},
}));

describe("NewPostForm component", () => {
	const mockCreate = vi.fn();
	const mockReset = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// @ts-ignore
		useCreatePost.mockReturnValue({ create: mockCreate, state: "idle" });
	});

	it("should take a snapshot", () => {
		const { asFragment } = render(
			<Provider>
				<NewPostForm />
			</Provider>,
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render the from with inputs and button", () => {
		render(
			<Provider>
				<NewPostForm />
			</Provider>,
		);

		expect(screen.getByTestId("name-input")).toBeInTheDocument();
		expect(screen.getByTestId("description-input")).toBeInTheDocument();
		expect(screen.getByTestId("submit-button")).toBeInTheDocument();
	});

	it("should call create and reset on form submit", () => {
		render(
			<Provider>
				<NewPostForm />
			</Provider>,
		);

		fireEvent.input(screen.getByPlaceholderText("Nombre"), {
			target: { value: "Test Name" },
		});
		fireEvent.input(screen.getByPlaceholderText("Descripción"), {
			target: { value: "Test Description" },
		});
		fireEvent.submit(screen.getByRole("form"));

		waitFor(() => {
			expect(mockCreate).toHaveBeenCalledTimes(1);
			expect(mockCreate).toHaveBeenCalledWith({
				name: "Test Name",
				description: "Test Description",
			});
			expect(mockReset).toHaveBeenCalledTimes(1);
		});
	});

	it("should show error toaster when state is error", () => {
		//@ts-ignore
		useCreatePost.mockReturnValue({
			create: mockCreate,
			state: "error",
		});

		render(
			<Provider>
				<NewPostForm />
			</Provider>,
		);

		waitFor(() => {
			expect(toaster.create).toHaveBeenCalledWith({
				title: "Ocurrió un error al crear el post",
				type: "error",
			});
		});
	});
});
