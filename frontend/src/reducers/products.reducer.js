const initState = {
  data: [],
  dataReady: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_DATA":
      return {
        ...state,
        dataReady: false,
        filtersReady: false,
      };
    case "SET_PRODUCT_DATA":
      return {
        data: action.payload,
        dataReady: true,
      };
    default:
      return state;
  }
};
