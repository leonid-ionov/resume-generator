declare module 'vitest' {
  interface Assertion<T> {
    toMatchImageSnapshot: () => T;
  }
}
