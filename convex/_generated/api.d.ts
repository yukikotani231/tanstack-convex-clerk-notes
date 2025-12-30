import type { FunctionReference } from "convex/server";

export declare const api: {
  notes: {
    list: FunctionReference<"query", "public", { userId: string }, any[]>;
    get: FunctionReference<"query", "public", { id: string }, any>;
    create: FunctionReference<
      "mutation",
      "public",
      { userId: string; title: string; content: string },
      string
    >;
    update: FunctionReference<
      "mutation",
      "public",
      { id: string; title: string; content: string },
      void
    >;
    remove: FunctionReference<"mutation", "public", { id: string }, void>;
  };
};
