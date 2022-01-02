export const fetchProductData = (url) => async (dispatch) => {
  dispatch({
    type: "FETCH_SINGLE_PRODUCT_DATA",
    payload: url,
  });
  const { productData } = await fetch(`/api/product/${url}`).then((res) =>
    res.json()
  );

  dispatch({
    type: "SET_SINGLE_PRODUCT_DATA",
    payload: productData,
    productUrl: url,
  });
};
