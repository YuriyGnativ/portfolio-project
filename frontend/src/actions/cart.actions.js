export const pushCart = (item) => {
  return {
    type: "PUSH",
    payload: { ...item },
  };
};
export const shiftCart = (id) => {
  return {
    type: "SHIFT",
    id,
  };
};
