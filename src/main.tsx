import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { store } from "@/store.ts";
import "./index.css";
import App from "./App.tsx";

// TODO: hacer tests
// TODO: ver como escribir datos en el archivo o en la bd del navegador

async function enableMocking() {
	if (import.meta.env.PROD) {
		return;
	}

	const { worker } = await import("./mocks/browser");

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start();
}

enableMocking().then(() => {
	const rootElement = document.getElementById("root");
	if (rootElement) {
		createRoot(rootElement).render(
			<StrictMode>
				<Provider store={store}>
					<ChakraProvider>
						<App />
					</ChakraProvider>
				</Provider>
			</StrictMode>,
		);
	} else {
		console.error("Root element not found");
	}
});
