const initState = {
  logged: false,
};

const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      return {
        logged: true,
      };
    default:
      return state;
  }
};

export default mainReducer;
