const initState = {
  currentStep: 1,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      };
    // case "STEP_FORWARD":
    //   return {
    //     ...state,
    //     currentStep: action.payload,
    //   };
    // case "STEP_BACK":
    //   return {
    //     ...state,
    //     currentStep: action.payload,
    //   };
    default:
      return state;
  }
};
