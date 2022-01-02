const initState = {
  loading: false,
  results: [],
  value: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case "START_SEARCH":
      return {
        ...state,
        loading: true,
        value: action.payload,
      };
    case "FINISH_SEARCH":
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case "UPDATE_SELECTION":
      return {
        ...state,
        value: action.payload,
      };
    case "CLEAN_QUERY":
      return initState;
    default:
      return state;
    // throw new Error();
  }
};
