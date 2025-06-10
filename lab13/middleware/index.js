export function checkAdmin(req, res, next) {
  const role = req.headers["x-user-role"];
  if (role != "admin") {
    res.status(403).json({ error: "Only admin can perform this action" });
  }

  next();
}
