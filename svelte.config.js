// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}, paths: {
		base: process.env.NODE_ENV === "production" ? "/sveltekit-gh-pages" : "",
		"$lib": ["src/lib"],
		"$lib/*": ["src/lib/*"]
	},
};

export default config;
