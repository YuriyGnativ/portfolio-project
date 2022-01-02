module.exports = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  console.log("token check");
  // console.log(token);
  // console.log(req.headers);
  next();
  // token ? next({ token }) : next({ token: null });
};
