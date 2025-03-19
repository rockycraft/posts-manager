import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { Provider } from "react-redux";
import { store } from "@/store";

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

vi.mock("./features/posts/pages/PostsPages", () => ({
	__esModule: true,
	default: () => <div>PostsPages Component</div>,
}));

describe("App component", () => {
	it("should render the loading fallback", () => {
		render(
			<Provider store={store}>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</Provider>,
		);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should match snapshot", async () => {
		const { asFragment } = render(
			<Provider store={store}>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</Provider>,
		);

		expect(asFragment()).toMatchSnapshot();
	});
});
