import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NoDataMessage from "../index";
import { describe, it, expect, vi } from "vitest";
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

describe("NoDataMessage component", () => {
	it("should render the no data message", () => {
		render(
			<Provider>
				<NoDataMessage />
			</Provider>,
		);

		expect(screen.getByTestId("no-data-message")).toBeInTheDocument();
	});

	it("should match snapshot", () => {
		const { asFragment } = render(
			<Provider>
				<NoDataMessage />
			</Provider>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
