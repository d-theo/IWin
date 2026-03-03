export const shouldAppear = (index: number, roll: number) => {
  const o: any = {
    1: [2, 3, 5, 4, 6],
    2: [6],
    3: [4, 5, 6],
    4: [],
    5: [1, 3, 5],
    6: [],
    7: [4, 5, 6],
    8: [6],
    9: [2, 3, 4, 5, 6],
  };

  const a = o[index] as number[];
  return a.indexOf(roll) !== -1;
};
