import express from "express"
import router from "./routes/user.route.js"
const app = express()
app.use(express.json())
app.use('/api/v1',router)
app.get('/',(req,res)=>{
    return res.send("Hi")
})

app.listen(3000,()=>console.log('Server listning on port 3000'))