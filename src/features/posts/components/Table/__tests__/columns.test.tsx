import "@testing-library/jest-dom";
import { COLUMNS } from "../columns";
import { describe, it, expect, vi } from "vitest";

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

vi.mock("../DeleteButton", () => ({
	DeleteButton: vi.fn(() => <button>Delete</button>),
}));

describe("Table columns configuration", () => {
	it("should have the correct columns configuration", () => {
		expect(COLUMNS).toHaveLength(3);

		expect(COLUMNS[0]).toMatchObject({
			header: "Nombre",
			accessorKey: "name",
		});

		expect(COLUMNS[1]).toMatchObject({
			header: "Descripción",
			accessorKey: "description",
		});

		expect(COLUMNS[2]).toMatchObject({
			header: "Acciones",
			accessorKey: "id",
		});
	});

	// it("should render DeleteButton in the actions column", () => {
	// 	const mockPost: Post = {
	// 		id: "1",
	// 		name: "Post 1",
	// 		description: "Description 1",
	// 	};
	// 	const CellComponent = COLUMNS[2].cell as any;

	// 	render(
	// 		<Provider>
	// 			<CellComponent row={{ original: mockPost }} />
	// 		</Provider>,
	// 	);

	// 	expect(screen.getByTestId("delete-post=button")).toBeInTheDocument();
	// });
});
