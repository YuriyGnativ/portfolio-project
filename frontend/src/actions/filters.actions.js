export const fetchFilters = (url) => async (dispatch) => {
  dispatch({ type: "FETCH_FILTERS" });
  const { filters } = await fetch(url).then((res) => {
    return res.json();
  });
  dispatch({
    type: "SET_FILTERS",
    payload: filters,
  });
};
