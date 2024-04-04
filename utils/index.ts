/**
 * Delays the execution of a function by the specified amount of time.
 * @param n - The number of milliseconds to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export const delay = (n: number) => {
  n = n || 0;
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, n);
  });
};
