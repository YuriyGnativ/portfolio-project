const initState = {
  count: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_COUNT":
      return {
        count: action.payload,
      };
    default:
      return state;
  }
};
