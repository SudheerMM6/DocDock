import jwt from 'jsonwebtoken'


// admin authentication middleware
const authAdmin = async (req,res,next)=>{
     try {
        
        const {atoken} = req.headers
        if (!atoken) {
            return res.status(401).json({success:false,message:'Not authorized'})
        } 

        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

        if (token_decode.role !== 'admin') {
            
            return res.status(403).json({success:false,message:'Admin access required'})
        }
            next()
            
     } catch (error) {
        
        return res.status(401).json({success:false,message:'Not authorized'})

     }
}

export default authAdmin
