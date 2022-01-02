import { combineReducers } from "redux";

import mainReducer from "./main.reducer";
import cartReducer from "./cart.reducer";
import productsReducer from "./products.reducer";
import authReducer from "./auth.reducer";
import userDataReducer from "./user.reducer";
import filtersReducer from "./filters.reducer";
import paginationReducer from "./pagination.reducer";
import singleitemReducer from "./singleitem.reducer";
import signupReducer from "./signupReducer.reducer";
import searchReducer from "./search.reducer";

export default combineReducers({
  mainReducer,
  cartReducer,
  productsReducer,
  authReducer,
  userDataReducer,
  filtersReducer,
  paginationReducer,
  singleitemReducer,
  signupReducer,
  searchReducer,
});
