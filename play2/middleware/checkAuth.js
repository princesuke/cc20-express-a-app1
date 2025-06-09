export default function checkAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (token === "Bearer 123") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
