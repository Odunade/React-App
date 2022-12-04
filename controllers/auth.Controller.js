import User from "../models/User.js"
import bcrypt from "bcryptjs";


//REGISTER
export const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).json("User has been Created")
    }catch(err){
        next(err)
    }
}

//LOGIN
export const login = async (req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if (!user) 
        return res.status(404).json("Wrong username");

        const isPasswordCorrect = await bcrypt.compare(req.body.password, 
        user.password);
        if(!isPasswordCorrect) 
        return res.status(400).json("Wrong password or Username");
       
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}