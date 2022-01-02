import { setCount } from "./pagination.actions";

export const fetchProductData = (url) => async (dispatch) => {
  dispatch({
    type: "FETCH_PRODUCT_DATA",
  });
  const { data } = await fetch(url).then((res) => res.json());
  dispatch({
    type: "SET_PRODUCT_DATA",
    payload: data,
  });
};

export const fetchAndCountData = (url) => async (dispatch) => {
  dispatch({
    type: "FETCH_PRODUCT_DATA",
  });
  const { data, count } = await fetch(url).then((res) => res.json());
  dispatch({
    type: "SET_PRODUCT_DATA",
    payload: data,
  });
  dispatch(setCount(count));
  // dispatch({
  //   type: "SET_COUNT",
  //   payload: count,
  // });
};
