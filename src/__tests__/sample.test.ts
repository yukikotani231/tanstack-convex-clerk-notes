import { describe, it, expect } from "vitest";

describe("sample tests", () => {
  it("should pass basic arithmetic", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string operations", () => {
    expect("hello world").toContain("world");
  });
});
