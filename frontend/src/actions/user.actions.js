export const fetchUserData = (url) => async (dispatch) => {
  dispatch({
    type: "REQUEST_USER_DATA",
  });
  const user = await fetch(`/api/user/${url}/info`).then((res) => res.json());
  dispatch({
    type: "DATA_FETCH_SUCCESS",
    payload: user,
  });
};

export const dataFetchSuccess = (userData) => ({
  type: "DATA_FETCH_SUCCESS",
  payload: userData,
});
