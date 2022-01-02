const initState = {
  filters: [],
  filtersReady: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FILTERS":
      return {
        ...state,
        filtersReady: false,
      };
    case "SET_FILTERS":
      return {
        filters: action.payload,
        filtersReady: true,
      };
    default:
      return state;
  }
};
