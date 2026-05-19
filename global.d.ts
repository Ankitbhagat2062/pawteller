// global.d.ts

// Look, no imports or exports at all! Clean and warning-free.
declare global {
  var mongoose:
    | {
        conn: import("mongoose").Mongoose | null;
        promise: Promise<import("mongoose").Mongoose> | null;
      }
    | undefined;
}

export {};