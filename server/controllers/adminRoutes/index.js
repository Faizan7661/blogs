import express from 'express';
import jwt from 'jsonwebtoken';
import AdminModel from '../../models/AdminModel.js'
const router = express.Router();


router.post('/signIn', async (req,res)=>{
    try {
        const {email , password} = req.body ;
        const existingUser = await AdminModel.findOne({email});

        if(!existingUser){
            return res.status(409).json({
                message : `User Does Not Exist. Please Register!`,
                status : false
            })
        }

    
        if(req.body.password !== existingUser.password){
            return res.status(200).json({
                message : `Incorrect Password`,
                status : false
            })
        }

        let payload = {
            email : req.body.email,
            role : 'user'
        }

        let privateKey = 'qwerty123'

        let token = jwt.sign(payload,privateKey,{
            expiresIn : '1d'
        });

        return res.status(200).json({
            message : 'User Logged in SuccessFully',
            status : true,
            token
        })  


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message : 'Internal Server Error',
            status : false
        })
    }
})

export default router;