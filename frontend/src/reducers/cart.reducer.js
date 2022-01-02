const initState = {
  items: [],
  hasItems: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case "PUSH":
      return {
        ...state,
        hasItems: true,
        items: [...state.items, action.payload],
      };
    case "SHIFT":
      if (state.items.length === 1) {
        return {
          ...state,
          hasItems: false,
          items: state.items.filter((i) => i.id !== action.id),
        };
      } else {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.id),
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
