import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

/*
  Purpose is to use the function cleanup after each test to reset jsdom(browser simulator)
*/
afterEach(() => {
  cleanup();
});
