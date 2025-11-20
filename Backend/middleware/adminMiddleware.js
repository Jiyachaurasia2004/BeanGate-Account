const adminMiddleware = async(req,res,next)=>{
    try {
        const adminRole = req.user.isAdmin;
        if(!adminRole){
           return res.status(400).json({msg:"User is not in admin"})
        }
        next();
    } catch (error) {
        next(error)
    }
}
module.exports = adminMiddleware;