const jwt = require('jsonwebtoken');

const authenticate=async function(req,res,next){
    
try {
    
   let token=req.headers.authorization
   if(!token) return res.status(400).send({status:false,message:"Token is required, please login"});
   if(req.params.teacherId.length<1){return res.status(401).send({status:false,message:"params required , login again"})}

   let newToken = token.replace('Bearer ',"")
   let decodedToken = jwt.verify(newToken, "YSCSTxJPqDHSdtmS")
   if (!decodedToken) return res.status(401).send({ status: false, msg: "Authentication failed" });

    if(decodedToken.id!==req.params.teacherId){return res.status(403).send({status:false,message:"authorization failed you are not authorized "})}

    next();

} catch (error) {
    return res.status(500).send({ status: false, msg: error.message })
}

}

module.exports={authenticate}