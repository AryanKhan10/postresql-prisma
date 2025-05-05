import express from "express"
import user from "./routes/user.route.js"
import post from "./routes/post.route.js"
import comment from "./routes/comment.route.js"
const app = express()
app.use(express.json())

app.use('/api/v1/user',user)
app.use('/api/v1/post',post)
app.use('/api/v1/comment',comment)

app.get('/',(req,res)=>{
    return res.send("Hi")
})

app.listen(3000,()=>console.log('Server listning on port 3000'))