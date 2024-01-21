const isEmpty = (val: unknown) => {
  if (typeof val === "undefined" || val === null || val === "" || val === 0)
    return true;
  else return false;
};

export const sleep = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const toolCommon = {
  isEmpty,
  sleep,
};

export default toolCommon;
