import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PostsPages from "../index";
import { useGetAllPosts } from "../../../hooks/useGetAllPosts";
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

vi.mock("../../../hooks/useGetAllPosts");

describe("PostsPages component", () => {
	const mockData = [
		{ id: "1", name: "Post 1", description: "Description 1" },
		{ id: "2", name: "Post 2", description: "Description 2" },
	];

	beforeEach(() => {
		vi.clearAllMocks();
		// @ts-ignore
		useGetAllPosts.mockReturnValue({ data: mockData });
	});

	it("should render the PostsPages component with data", () => {
		render(
			<Provider store={store}>
				<ChakraProvider>
					<PostsPages />
				</ChakraProvider>
			</Provider>,
		);

		expect(screen.getByText("Post 1")).toBeInTheDocument();
		expect(screen.getByText("Post 2")).toBeInTheDocument();
	});

	it("should render NoDataMessage when there is no data", () => {
		// @ts-ignore
		useGetAllPosts.mockReturnValue({ data: [] });

		render(
			<Provider store={store}>
				<ChakraProvider>
					<PostsPages />
				</ChakraProvider>
			</Provider>,
		);

		expect(screen.getByText("No hay posts para mostrar")).toBeInTheDocument();
	});

	it("should match snapshot", () => {
		const { asFragment } = render(
			<Provider store={store}>
				<ChakraProvider>
					<PostsPages />
				</ChakraProvider>
			</Provider>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
