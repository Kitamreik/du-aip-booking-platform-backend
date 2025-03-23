const { requireAuth } = require("@clerk/express");
const { getUser } = require("@clerk/clerk-sdk-node"); // still used for full user objects


//Clerk Integration
const verifyAdmin = requireAuth(async (req, res, next) => {
  const {userId} = req.auth;

  try {
    const user = await getUser(userId); //fetches the user’s role from Clerk’s publicMetadata.
    const role = user.publicMetadata.role;
    console.log(user, role)

    if ( role === "admin") {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
  } catch (error) {
    console.log("Clerk error:", error);
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

  