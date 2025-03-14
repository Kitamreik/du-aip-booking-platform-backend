//Handles JWT authentication, role-based access control (RBAC), and error handling.
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      return next();
    }
    res.status(403).json({ error: "Access denied" });
  };
  
  module.exports = { verifyAdmin };
  