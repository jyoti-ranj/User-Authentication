const express = require("express");
const app = express();
app.use(express.json());
const port = 3000
const jwt = require("jsonwebtoken");
const jwtPassword = "Jyoti123"
const { signUp , signIn } = require("./types");
const { User } = require("./db")

app.post("/signup" , async(req,res)=>{
    const {firstName , username , password } = req.body;
   
    if(!firstName ||!username || ! password){
        res.status(411).json({
            message: "You have to fill all the fields"
        })
    }
    const parseData = signUp.safeParse({firstName , username , password});
    if(!parseData.success){
        res.status(411).json({
            message:"Invalid Data"
        })
    }

    const existingUsers = User.findOne({username: username});
     if(!existingUsers){
        res.status(400).json({
            message: "User already exist"
        })
     }

     const newUser = await User.create({
        firstName,
        username,
        password
     })
    
     
     res.status(200).json({
        message: `User created successfully ${newUser.firstName}`
     })

})


app.post("/signin" , async(req,res)=>{
    const {username , password} = req.body;
    if(!username || !password){
        res.status(411).json({
            message: "You have to fill all the field"
        })
    }
    const parseData = signIn.safeParse({username , password});
    if(!parseData.success){
        res.status(411).json({
            message: "Invalid data"
        })
    }
    const user = await User.findOne({username : username})
    if(!user){
        res.status(404).json({
            message: "User doesn't exist"
        })
    }
    const token = jwt.sign({username: user.username , id:user._id},jwtPassword);

    res.status(200).json({
        message:`Welcome Back ${user.firstName} here is your token ${token}`
    })
})

app.get("/userList" , async(req,res)=>{
    const verified = req.header('authorization');
    if(!verified){
        res.status(400).json({
            message:"Token is not present"
        })
    }
    const authenticate = jwt.verify(verified , jwtPassword);
    if(!authenticate){
        res.status(400).json({
            message: "You are not verified user"
        })
    }
    const username = authenticate.username
    const userList = await User.find({});
    const users = userList.filter(u => u.username !== username);

    res.status(200).json({
        message:`Below are the userlist`,
        users
    })
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})