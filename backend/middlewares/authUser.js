import jwt from 'jsonwebtoken'


// user authentication middleware
const authUser = async (req,res,next)=>{
     try {
        const {token} = req.headers
        if (!token) {
            // ADD 'return' HERE
            return res.json({success:false,message:'Not authorized Login'})
        } 

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
            
     } catch (error) {
        console.log(error);
        return res.json({success:false,message:'Not authorized Login'}) // You have it here, good.
     }
}
export default authUser
