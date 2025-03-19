import { lazy, Suspense } from "react";

const LazyPostsPages = lazy(() => import("./features/posts/pages/PostsPages"));

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LazyPostsPages />
		</Suspense>
	);
}

export default App;
