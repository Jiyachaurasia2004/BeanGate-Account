const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized: No user found" });
    }

    console.log("req.user:", req.user);
   console.log(req.user.isAdmin);
   
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied: User is not admin" });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ msg: "Server error" });
    }
  }
};

module.exports = adminMiddleware;
