const { ClerkExpressWithAuth, users } = require("@clerk/clerk-sdk-node");

//Clerk Integration
const verifyAdmin = ClerkExpressWithAuth(async (req, res, next) => {
  const userId = req.auth.userId;

  try {
    const user = await users.getUser(userId); //fetches the user’s role from Clerk’s publicMetadata.

    if (user.publicMetadata.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { verifyAdmin };


//Basic: Handles JSON Web Token authentication, role-based access control (RBAC), and error handling.

/*
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      return next();
    }
    res.status(403).json({ error: "Access denied" });
  };
  
  module.exports = { verifyAdmin };
*/

  