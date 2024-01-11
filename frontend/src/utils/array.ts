export const findLast = <T>(array: T[], condition: (item: T) => boolean): T | undefined => {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (condition(array[i])) {
      return array[i];
    }
  }

  return undefined;
};
