import express from "express"
import user from "./routes/user.route.js"
import post from "./routes/post.route.js"
const app = express()
app.use(express.json())

app.use('/api/v1/user',user)
app.use('/api/v1/post',post)

app.get('/',(req,res)=>{
    return res.send("Hi")
})

app.listen(3000,()=>console.log('Server listning on port 3000'))