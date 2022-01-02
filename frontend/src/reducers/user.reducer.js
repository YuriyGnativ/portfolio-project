const initState = {
  data: null,
  isFetching: false,
  dataReady: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "REQUEST_USER_DATA":
      return {
        ...state,
        isFetching: true,
      };
    case "DATA_FETCH_SUCCESS":
      return {
        data: action.payload,
        isFetching: false,
        dataReady: true,
      };
    case "DATA_FETCH_FAILURE":
      return {
        data: null,
        isFetching: false,
      };
    default:
      return state;
  }
};
