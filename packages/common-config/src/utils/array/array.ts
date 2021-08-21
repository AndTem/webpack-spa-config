const flat = <T>(array: Array<T[]>): T[] =>
  array.reduce((flatArray, currentArray) => flatArray.concat(currentArray), []);

export { flat };
