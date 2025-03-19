import { http, HttpResponse } from "msw";
import dataFile from "./data.json";

const posts = [...dataFile];

export const handlers = [
	// Intercept "GET https://example.com/user" requests...
	// http.get("https://example.com/user", () => {
	// 	// ...and respond to them using this JSON response.
	// 	return HttpResponse.json({
	// 		id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
	// 		firstName: "John",
	// 		lastName: "Maverick",
	// 	});
	// }),
	http.get("https://challenge.com/posts", () => {
		return HttpResponse.json(posts);
	}),
	http.delete("https://challenge.com/posts/:id", ({ params }) => {
		// Aqui se supone que se elimina de la bd el elemento y retorna el elemento eliminado
		const { id } = params;
		const [response] = posts.filter((post) => post.id === id);
		return HttpResponse.json(response);
	}),
	http.post("https://challenge.com/posts", async ({ request }) => {
		const body = await request.json();
		return HttpResponse.json(
			// @ts-ignore
			{ ...body, id: self.crypto.randomUUID() },
			{ status: 201 },
		);
	}),
];
