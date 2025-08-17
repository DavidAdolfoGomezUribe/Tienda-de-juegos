export default function checkJsonContentType(req, res, next) {
  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return res.status(415).json({
      success: false,
      message: "Invalid file type: only JSON is allowed"
    });
  }
  next();
}
