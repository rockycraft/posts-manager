import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteButton } from "../DeleteButton";
import { useDeletePost } from "../../../hooks/useDeletePost";
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

vi.mock("../../../hooks/useDeletePost");

describe("DeleteButton component", () => {
	const mockDeletePost = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// @ts-ignore
		useDeletePost.mockReturnValue({
			deletePost: mockDeletePost,
		});
	});

	it("should render the delete button", () => {
		render(
			<Provider>
				<DeleteButton id="1" />
			</Provider>,
		);

		expect(screen.getByTestId("delete-post=button")).toBeInTheDocument();
	});

	it("should call deletePost with the correct id when clicked", () => {
		render(
			<Provider>
				<DeleteButton id="1" />
			</Provider>,
		);

		fireEvent.click(screen.getByTestId("delete-post=button"));

		expect(mockDeletePost).toHaveBeenCalledTimes(1);
		expect(mockDeletePost).toHaveBeenCalledWith("1");
	});

	it("should match snapshot", () => {
		const { asFragment } = render(
			<Provider>
				<DeleteButton id="1" />
			</Provider>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
