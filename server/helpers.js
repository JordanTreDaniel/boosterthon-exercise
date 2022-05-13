export const getRandomElement = (arr) => {
  const randomIdx = Math.floor(Math.random() * arr.length);
  return arr[randomIdx];
};
