type CompareArrayArgType = number[] | string[];

export default (a: CompareArrayArgType, b: CompareArrayArgType): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};
