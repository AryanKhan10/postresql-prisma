import prisma from "../db/db.config.js";

const createPost = async(req, res)=>{
    try {
        // console.log(req.body)
        const { userId,title,description} = req.body;
        if(!userId || !title || !description) {
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        const newPost = await prisma.post.create({
            data:{
                userId:userId,
                title:title,
                description:description,
            }
        })
        res.status(200).json({
            success:true,
            message:"Post created",
            newPost
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
const updatePost = async(req, res)=>{
    try {
        // console.log(req.params)
        const id = req.params.id
        // console.log(typeof(id))
        const { title,description} = req.body;

        const findPost = await prisma.post.findFirst({
            where:{
                id:Number(id)
            }
        })
        console.log("findPost ",findPost)
        if(!findPost){
            return res.status(404).json({
                success:false,
                message:"Post doesn't exist"
            })
        }

        const updatedPost = await prisma.post.update({
            where:{
                id:Number(id)
            },
            data:{
                title:title,
                description:description,
            }
        })
        res.status(200).json({
            success:true,
            message:"Post updated",
            updatedPost
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
const deletePost = async(req, res)=>{
    try {
        console.log(req.params)
        const { id } = req.params;

        const deletedPost = await prisma.post.delete({
            where:{
                id:Number(id)
            }
        })
        console.log("deletedPost ",deletedPost)
        if(!deletedPost){
            return res.status(404).json({
                success:false,
                message:"Post doesn't exist"
            })
        }

        res.status(200).json({
            success:true,
            message:"Post deleted",
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
const getAllPost = async(req, res)=>{
    
    try {
        const allPost = await prisma.post.findMany({
            include:{
                comments:{
                    include:{
                        // user:true
                        user:{
                            select:{
                                firstname:true
                            }
                        }
                    }
                }
            },
            orderBy: { id:"desc" }
        })

        res.status(200).json({
            success:true,
            message:"Posts fetched",
            allPost
        })
    }catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}



export {createPost, updatePost, deletePost, getAllPost}
