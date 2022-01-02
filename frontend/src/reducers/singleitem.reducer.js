const initState = {
  productUrl: "",
  productData: {},
  isFetching: true,
  dataReady: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_SINGLE_PRODUCT_DATA":
      return {
        ...state,
        isFetching: true,
        productUrl: action.payload,
      };
    case "SET_SINGLE_PRODUCT_DATA":
      return {
        ...state,
        isFetching: false,
        productData: action.payload,
        dataReady: true,
      };

    default:
      return state;
  }
};
