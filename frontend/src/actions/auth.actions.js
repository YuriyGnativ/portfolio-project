export const signIn = (userData) => async (dispatch) => {
  dispatch(signinRequest());
  try {
    fetch("/signin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        dispatch(signinSuccess(token.split(" ")[1]));
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const signinRequest = () => {
  return {
    type: "SIGNIN_REQUEST",
  };
};

export const signinSuccess = (token, userUrl) => {
  window.localStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userUrl,
    })
  );
  return {
    type: "SIGNIN_SUCCESS",
    payload: userUrl,
    token,
  };
};

// const signinSuccess = () => {
//   return {
//     type: "SIGNIN_SUCCESS",
//   };
// };

const signoutSuccess = () => {
  window.localStorage.removeItem("userData");
  return {
    type: "SIGNOUT_SUCCESS",
  };
};

const signoutRequest = () => {
  return {
    type: "SIGNOUT_REQUEST",
  };
};

export const signOut = () => (dispatch) => {
  dispatch(signoutRequest());
  setTimeout(() => {
    dispatch(signoutSuccess());
  }, 1100);
};
