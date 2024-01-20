const isEmpty = (val: unknown) => {
  if (typeof val === "undefined" || val === null || val === "" || val === 0)
    return true;
  else return false;
};

const toolCommon = {
  isEmpty,
};

export default toolCommon;
