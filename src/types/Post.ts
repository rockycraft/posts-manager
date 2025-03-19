import { z } from "zod";

export const postSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
});

export type Post = z.infer<typeof postSchema>;
