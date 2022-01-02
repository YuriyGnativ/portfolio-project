const initState = {
  isAuthenticated: false,
  token: null,
  isFetching: false,
  userUrl: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return {
        ...state,
        isFetching: true,
      };
    case "SIGNIN_SUCCESS":
      return {
        isAuthenticated: true,
        token: action.token,
        isFetching: false,
        userUrl: action.payload,
      };
    case "SIGNIN_FAILURE":
      return {};
    case "SIGNOUT_REQUEST":
      return {
        ...state,
        isFetching: true,
      };
    case "SIGNOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isFetching: false,
        userUrl: null,
      };
    case "SIGNOUT_FAILURE":
      return {};
    default:
      return state;
  }
};

export default userReducer;
