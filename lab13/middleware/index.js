export function checkAdmin(req, res, next) {
  const role = req.headers["x-user-role"];
  console.log(role);

  next();
}
