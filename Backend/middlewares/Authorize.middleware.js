const Authorize=(permittedRoles)=>{
    return async(req,res,next)=>{
        try {
            const role=req.user.role
            if(permittedRoles.includes(role)){
                next()
            }
            else{
                res.status(404).send(`UserRole is not authorized `)
            }
        } catch (error) {
            res.status(404).send(`Error in authorization ${error}`)
            
        }
    
    }
}
    
module.exports=Authorize