const adminMiddleware = async (req, res, next) => {
  try {
    // Make sure req.user exists (from auth middleware)
   
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized: No user found" });
    }
   
     console.log(req.user.isAdmin);
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: "Access denied: User is not admin" });
    }
    
     
    // User is admin, continue
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = adminMiddleware;
