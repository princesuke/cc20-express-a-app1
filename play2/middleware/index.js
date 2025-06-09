export function logRequest(req, res, next) {
  console.log(`Method: ${req.method}, Path: ${req.url}`);
  next();
}

export function checkFieldName(req, res, next) {
  const name = req.body.name;
  //   console.log(name);
  if (!name) {
    res.status(400).json({ error: "Missing 'name' in request body" });
  }

  next();
}

export function toUpperCaseName(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

export function checkUserIdParam(req, res, next) {
  const id = req.params.id;
  if (isNaN(Number(id))) {
    return res.status(404).json({ error: "Invalid user id" });
  }
  next();
}

export function checkApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey != "abc123") {
    return res.status(403).json({ error: "Invalid key" });
  }
  next();
}
