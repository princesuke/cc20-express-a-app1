export default function normalizeName(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }
  next();
}
