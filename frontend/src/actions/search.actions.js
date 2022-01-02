export const startSearch = (value) => async (dispatch) => {
  dispatch({
    type: "START_SEARCH",
    payload: value,
  });
};

export const fetchData = (value) => async (dispatch) => {
  const { products } = await fetch(`/api/product/search?name=${value}`, {
    method: "get",
  }).then((res) => res.json());
  // console.log(products);
  dispatch({
    type: "FINISH_SEARCH",
    // payload: [],
    payload:
      products.length > 0
        ? products.map((i) => {
            return {
              title: i.name,
              description: i.description,
              price: i.price,
              image: i.main_image,
              url: i.url,
            };
          })
        : [],
  });
};

export const cleanQuery = () => ({
  type: "CLEAN_QUERY",
});

export const updateSelection = (title) => ({
  type: "UPDATE_SELECTION",
  payload: title,
});
