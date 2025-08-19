const zod = require("zod");


const signUp = zod.object({
    firstName:zod.string(),
    username:zod.string().email(),
    password:zod.string().min(5).max(10)
})

const signIn = zod.object({
    username:zod.string().email(),
    password:zod.string().min(5).max(10)
})
module.exports ={
    signUp,
    signIn
}