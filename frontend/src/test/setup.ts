import "@testing-library/jest-dom/vitest";
import { server } from "./mock/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
