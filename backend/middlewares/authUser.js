import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req,res,next)=>{
     try {
        
        const {token} = req.headers
        if (!token) {
            return res.status(401).json({success:false,message:'Not authorized'})
        } 

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        req.userId = token_decode.id
         
        next()
            
     } catch (error) {
        
        return res.status(401).json({success:false,message:'Not authorized'})
     }
}

export default authUser
