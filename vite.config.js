import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const repoName = process.env.GITHUB_REPOSITORY?.split("/").pop() ?? "StudioDavita";
const pagesBase = process.env.GITHUB_PAGES === "true" ? `/${repoName}/` : "/";
export default defineConfig({
    base: pagesBase,
    plugins: [react()],
});
